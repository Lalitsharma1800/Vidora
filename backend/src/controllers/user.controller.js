import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "./../utils/apiError.js";
import {ApiResponse} from "./../utils/apiResponse.js";
import {User} from "./../model/username.model.js";
import {Subscription} from "./../model/subscription.model.js";
import { WatchHistory } from "../model/watchhistory.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";

const generateAccessTokenAndRefreshToken = async (userId) => {
    try{
        const user = await User.findById(userId);
        
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave: false});

        return {accessToken, refreshToken}
    }
    catch(err){
        throw new ApiError(500, `Something went wrong, while generating tokens`);
    }
}

const registerUser = asyncHandler(
    
    async (req, res) => {

        // Get the data from the req
        const {userName, email, fullName, password} = req.body;

        //validate the fields (must not be empty)
        if([userName, email, fullName, password].some((fields) => fields.trim() === "")){
            throw new ApiError(401,"All fields are required");
        };

        //validate the user Existed or not
        const existedUser = await User.findOne({
                $or: [{userName},{email}]
            })
        if(existedUser) throw new ApiError(409, "User already existed");

        //check for image, avatar
        const avatarLocalPath = req.files?.avatar[0]?.path;
        if(!avatarLocalPath) throw new ApiError(400, "Avatar file is required");

        let coverImageLocalPath;
        if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) coverImageLocalPath = req.files.coverImage[0].path;

        // upload documents on cloudinary
        const avatar = await uploadOnCloudinary(avatarLocalPath);
        let coverImage;
        if(coverImageLocalPath){
            coverImage = await uploadOnCloudinary(coverImageLocalPath);
        };

        if(!avatar) throw new ApiError(400, "Avatar file is required");

        // uploading details to db
        const user = await User.create({userName: userName.toLowerCase(), fullName, email, password, avatar: avatar?.url || "", coverImage: coverImage?.url || ""})

        // validate - is user created successfully
        const createdUser = await User.findById(user._id).select(
                                    "-password -refreshToken"
                                )

        if (!createdUser) {
            throw new ApiError(500, "Something went wrong while registering the user")
        }

        return  res.status(201).json(new ApiResponse(200, [createdUser], "User registered Successfully"))
    });

/**
============================================
    Register User Ends & Login User Starts
============================================
*/

const loginUser = asyncHandler(async (req, res) => {

        // Get the user credentials
        const {userName, email, password} = req.body;

        // validation for empty state
        if(!(userName || email)) throw new ApiError(400, "Username Or Email required");

        // find user in db
        const user = await User.findOne({
            $or: [{userName},{email}]
        })

        // validate user exit or not
        if(!user) throw new ApiError(404, "User does not exist.");

        // get pass
        const pass = user.password;

        // validate the password
        const isPasswordCorrect = await user.isPasswordCorrect(password);

        if(!isPasswordCorrect) throw new ApiError(401, "Credentials incorrect");

        const {accessToken, refreshToken} = await generateAccessTokenAndRefreshToken(user._id);

        const loggedUser = await User.findById(user._id).select("-password -refreshToken").select("-password -refreshToken");
        const options = {httpOnly: true, secure: true};

        return res
                    .status(200)
                    .cookie("accessToken", accessToken, options)
                    .cookie("refreshToken", refreshToken, options)
                    .json(
                        new ApiResponse(200, {user: loggedUser, accessToken, refreshToken}, "User logged in successfully")
                    )
});

/**
=================================================
   login User Ends & logOut user starts
=================================================
 */


const logout = asyncHandler(async (req, res) => {

        const loggedOutUser = await User.findByIdAndUpdate(req.user._id,{$set: {refreshToken: null}}, {returnDocument: "after"}).select("-password -refreshToken");

        const options = {httpOnly: true, secure: true};

        return res
                    .status(200)
                    .clearCookie("accessToken", options)
                    .clearCookie("refreshToken", options)
                    .json(
                        new ApiResponse(200, null, "User logged out successfully.")
                    )
})

/**
============================================================
   logout User Ends & refresh the access token user starts
============================================================
*/

const refreshAccessToken = asyncHandler(async (req, res) => {

    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if(!incomingRefreshToken) throw new ApiError(401, "unauthorised request");

    const payload = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);

    const user = await User.findById(payload?._id);

    if(!user && (incomingRefreshToken !== user.refreshToken))  throw new ApiError(401, "Invalid Access Token");

    const options = {httpOnly: true, secure: true};

    const {accessToken, refreshToken} = await generateAccessTokenAndRefreshToken();

    return res
                .status(200)
                .cookie("accessToken", options)
                .cookie("refreshToken", options)
                .json(
                    new ApiResponse(200, {accessToken, refreshToken}, "Access Token refreshed successfully")
                )

});

/**
==================================================================
   refresh the access token user end && change password starts
==================================================================
*/

const changePassword = asyncHandler(async (req, res) => {

    const {oldpassword,newPassword} = req.body;

    if(!newPassword || !oldpassword) throw new ApiError(401, "Please Enter a valid password");

    const user = await User.findById(req.user._id);
    
    if(!user) throw new ApiError(401, "user not found");

    const isPasswordCorrect = await user.isPasswordCorrect(oldpassword);

    if(!isPasswordCorrect) throw new ApiError(401, "Invalid Old Password");

    user.password = newPassword;
    
    await user.save({validateBeforeSave: false});

    return res
                .status(200)
                .json(new ApiResponse(200, null, "Password changed successfully"))

});

/**
==================================================================
change password ends && get currentUser starts
==================================================================
*/

const getCurrentUser = asyncHandler(async (req, res) => {

    return res
                .status(200)
                .json(new ApiResponse(200, {user: req.user}, "Current User retrieved successfully"));
});

/**
==================================================================
get currentUser ends && update account details starts
==================================================================
*/

const updateAccountDetail = asyncHandler(async (req, res) => {
    const {fullName, email} = req.body;

    if(!fullName || !email) throw new ApiError(400, "All fields are required");

    const user = await User.findByIdAndUpdate(req.user?._id, {$set: {fullName: fullName, email: email}}, {returnDocument: "after"}).select("-password -refreshToken");

    if(!user) throw ApiError(500, {}, "There is something went wrong at updateAccountDetail");

    return res
                .status(200)
                .json(new ApiResponse(200, user, "user details updated successfully"));
});

/**
==================================================================
update account details ends && update avatar & cover image starts  
==================================================================
*/

const updateAvatar = asyncHandler(async (req, res) => {
            //check for  avatar
        const avatarLocalPath = req.file?.path;
        if(!avatarLocalPath) throw new ApiError(400, "Avatar file is required");

        // upload documents on cloudinary
        const avatar = await uploadOnCloudinary(avatarLocalPath);

        if(!avatar.url) throw new ApiError(500, "Something went wront while uploading the file to cloudinary");

        const user = await User.findByIdAndUpdate(req.user?._id,{ $set: {avatar: avatar.url}}, {returnDocument: "after"}).select("-password -refreshToken");
        if(!user) throw new ApiError(500, "avatar did not change please try again later");

        return res
                    .status(200)
                    .json(new ApiResponse(200, user, "Avatar changed successfully"));
});

/**
==================================================================
update avatar ends && update cover image starts 
==================================================================
*/

const updateCoverImage = asyncHandler(async (req, res) => {
            //check for image
        const coverImageLocalPath = req.file?.path;
        if(!coverImageLocalPath) throw new ApiError(400, "coverImage is required");

        // upload documents on cloudinary
        const coverImage = await uploadOnCloudinary(coverImageLocalPath);

        if(!coverImage.url) throw new ApiError(500, "Something went wront while uploading the file to cloudinary");
        const user = await User.findByIdAndUpdate(req.user?._id,{ $set: {coverImage: coverImage.url}}, {returnDocument: "after"}).select("-password -refreshToken");
        
        if(!user) throw new ApiError(500, "coverImage did not change please try again later");

        return res
                    .status(200)
                    .json(new ApiResponse(200, user, "coverImage changed successfully"));
});
/**
==================================================================
update cover ends && getChannelProfile starts
==================================================================
*/
const getChannelProfile = asyncHandler(async (req, res) => {
    const {username} = req.params;

    if(!username || username.trim() === "") throw new ApiError(401, "Username is missing.");

    const channel = await User.aggregate([

        {
            $match: {userName: username?.toLowerCase()}
        },
        {
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "channel",
                as: "subscribers"
            }
        },
        {
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "subscriber",
                as:"subscribed_to"
            }
        },
        {
            $addFields:{
                subscriberCount: {
                    $size: "$subscribers"
                },
                subscribedToCount: {
                    $size: "$subscribed_to"
                },
                isSubscribed: {
                    $cond: {
                        if: {$in : [req.user?._id, "$subscribers.subscriber"]},
                        then: true,
                        else: false
                    }
                }
            },
        },
        {   $project: {
                fullName: 1,
                userName: 1,
                email: 1,
                avatar: 1,
                coverImage: 1,
                subscribedToCount: 1,
                subscriberCount: 1,
                isSubscribed: 1
            }
        }
    ]);
    if(!channel?.length) throw new ApiError(404, "channel does not exist");

    return res
                .status(200)
                .json(
                    new ApiResponse(200, channel[0], "User Channel fetched successfully")
                );
});
/**
==================================================================
getChannelProfile ends && watchHistory starts
==================================================================
*/

const watchHistory = asyncHandler(async (req, res) => {
    
        const user = req.user;
        const watch_history = await WatchHistory.aggregate([
            {
                $match: {userId: user.id}
            },
            {
                $lookup : {
                    from: "videos",
                    localField: "videoId",
                    foreignField: "_id",
                    as: "video",
                    pipeline: [
                        {
                            $lookup: {
                                from: "users",
                                localField:"owner",
                                foreignField: "_id",
                                as: "channel",
                                pipeline: [
                                    {
                                        $project: {
                                           userName: 1,
                                           fullName: 1,
                                           avatar: 1
                                        }
                                    },
                                ]                  
                            }
                        },
                        {
                            $unwind: "$channel"
                        },
                    ]
                },
            },
            {
                $unwind: "$video"
            },
            {
                $project: {
                    progress: 1,
                    video: 1,
                }
            }
        ])
        return res
                    .status(200)
                    .json(new ApiResponse(200, [watchHistory], "History fetched successfully"));
});


export {
        registerUser, 
        loginUser, 
        logout, 
        changePassword, 
        getCurrentUser, 
        updateAccountDetail, 
        updateAvatar, 
        updateCoverImage,
        refreshAccessToken,
        getChannelProfile,
        watchHistory
    };