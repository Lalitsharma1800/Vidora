import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "./../utils/apiError.js";
import {ApiResponse} from "./../utils/apiResponse.js";
import {User} from "./../model/username.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerUser = asyncHandler(async (req, res) => {

                                    res.status(200).json({message: "OK"});


// Get the data from the req
const {userName, email, fullName, password} = req.body;

//validate the fields (must not be empty)
if(
    [userName, email, fullName, password].some((fields) => fields.trim() === "")
){
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
const coverImage = await uploadOnCloudinary(coverImageLocalPath);

if(!avatar) throw new ApiError(400, "Avatar file is required");

// uplading details to db
const user = await User.create({userName: userName.tolowerCase(), fullName, email, password, avatar: avatar.url, coverImage: coverImage?.url || ""})

// validate - is user created successfully
const userCreated = await User.findById(user._id).select(
    "-password -refreshToken"
)

if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user")
}

return res.status(201).json(
    new ApiResponse(200, createdUser, "User registered Successfully")
)
                                });
export {registerUser};