import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "./../utils/apiError.js";
import {ApiResponse} from "./../utils/apiResponse.js";
import {User} from "./../model/username.model.js";
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
        const user = await User.create({userName: userName.toLowerCase(), fullName, email, password, avatar: avatar.url, coverImage: coverImage?.url || ""})

        // validate - is user created successfully
        const createdUser = await User.findById(user._id).select(
                                    "-password -refreshToken"
                                )

        if (!createdUser) {
            throw new ApiError(500, "Something went wrong while registering the user")
        }

        return  res.status(201).json(new ApiResponse(200, createdUser, "User registered Successfully"))
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

        const loggedUser = await User.findById(user._id).select("-password -refreshToken");

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

        const loggedOutUser = await User.findByIdAndUpdate(req.user._id,{$set: {refreshToken: null}}, {returnDocument: "after"});
        console.log(loggedOutUser);
        const options = {httpOnly: true, secure: true};

        return res
                    .status(200)
                    .clearCookie("accessToken", options)
                    .clearCookie("refreshToken", options)
                    .json(
                        new ApiResponse(200, {}, "User logged out successfully.")
                    )
})

/**
=========================================================
   logout User Ends & refresh the access token user starts
=========================================================
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

})

export {registerUser, loginUser, logout};