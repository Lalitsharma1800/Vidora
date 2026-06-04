import mongoose from "mongoose";
import { uploadVideoOnCloudinary } from "../utils/cloudinary.js";
import { User } from "../model/username.model.js";
import { Subscription } from "../model/subscription.model.js";
import {Video} from ".././model/video.model.js"
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { UploadStream } from "cloudinary";



const uploadVideo = asyncHandler(async (req, res) => {
    const user = req.user;
    const {title, description} = req.body;
    if(!title) throw new ApiError(400, "title not provided");
    
    const videoFile = req.file?.video[0]?.path;
    if(!videoFile) throw new ApiError(401, "Please upload video");
    
    const thumbnailFile = req.file?.thumbnail[0]?.path;
    if(!thumbnailFile) throw new ApiError(401, "Please upload thumbnail");
        
    const uploaded_video = await uploadVideoOnCloudinary(videoFile);
    if(!uploaded_video.url) throw new ApiError(500, "something went wrong while uploading the video file to cloudinary");

    const thumbnail = await uploadOnCloudinary(thumbnailFile);
    if(!thumbnail.url) throw new ApiError(500, "something went wrong while uploading the video file to cloudinary");

    const video = await Video.create({videoFile: uploaded_video.url, thumbnail: thumbnail.url, title: title, description: description || "", duration: uploaded_video.duration, owner: user._id});
    if(!video) throw new ApiError(500, "something went wrong while uploding video to mongodb");

    return res
                .status(200)
                .json(new ApiResponse(200, "video uploaded successfully"));
});


const changeThumbnail = asyncHandler(async (req, res) => {
    const user = req.user;

    const thumbnailFile = req.file?.path;
    if(!thumbnailFile) throw new ApiError(401, "Please upload thumbnail");
        
    const thumbnail = await uploadOnCloudinary(thumbnailFile);
    if(!thumbnail.url) throw new ApiError(500, "something went wrong while uploading the thumbnail file to cloudinary");

    const video = Video.findOne({owner: user._id});
    if(!video) throw new ApiError(400, "please upload a video first");

    return res
                .status(200)
                .json(new ApiResponse(200, "thumbnail changed successfully"))
});
export {uploadVideo, changeThumbnail};