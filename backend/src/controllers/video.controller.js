import mongoose from "mongoose";
import { uploadChunkToCloudinary, upload_Thumbnail_To_Cloudinary} from "../utils/cloudinary.js";
import { User } from "../model/username.model.js";
import {Video} from ".././model/video.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


/**
=======================
 only video upload
=======================
 */
const upload_video = asyncHandler(async (req, res) => {
    
    const {title, description, upload_id} = req.body;

    if (!title || !uploadId) throw new ApiError(400, "Title and uploadId are required");

    const video_file = req.file;

    if (!video_file) throw new ApiError(400, 'Video chunk file is required!');

    const video_result = await uploadChunkToCloudinary(video_file.buffer, upload_id);

    if(video_result && video_file.done === true){
        const session = await mongoose.startSession();

        try {
            await session.startTransaction();

            const upload_video = await Video.create([{videoFile: video_result.secure_url, thumbnail: "", title: title, description: description || "", duration: video_result.duration, owner: user._id}], {session});
            
            if(!upload_video) throw new ApiError(500, "video upload failed!!");

            const update_video_count = await User.findOneAndUpdate({_id: req.user._id}, {$inc: {totalVideos: 1}}, {returnDocument: "after", session});

            if(!update_video_count) throw new ApiError(500, "video uploading process failed while updating the user's video count");
            await session.commitTransaction();
            return res.status(200)
                      .json(new ApiResponse(200, {upload_video, update_video_count}, "video successfully uploaded"));
        } catch (error) {
            await session.abortTransaction();
            throw new ApiError(500, "something went wrong while uploading the video!!");     
        }
        finally{
            await session.endSession();
        }
    };
    return res.status(200)
              .josn(new ApiResponse(200, video_result, "chunk uploaded successfully"));
});
/**
=======================
 only thumbnail upload
=======================
 */

const upload_thumbnail = asyncHandler(async (req, res) => {

    const {video_id, upload_id} = req.body;

    if(!video_id || !upload_id) throw new ApiError(400, "video_id & upload_id is required!!");
    const thumbnail_file = req.file;
    if (!thumbnail_file)  throw new ApiError(400,'thumbnail file required!!');
    const thumbnail_result = await upload_Thumbnail_To_Cloudinary(thumbnail_file.buffer, upload_id);
    
    if (thumbnail_result && thumbnail_result.done === true) {
        const upload_thumbnail = await Video.findOneAndUpdate({_id: new mongoose.Types.ObjectId(video_id)},{$set: {thumbnail: thumbnail_result.secure_url}})
        if(!upload_thumbnail) throw new ApiError(500, "thumbnail upload failed!1");
        return res.status(200)
                  .json(new ApiResponse(200, upload_thumbnail, "thumbnail upload successfully"))
    }
});

const getVideo = asyncHandler(async (req, res) => {
    const {id} = req.params;
    if(!id) throw new ApiError(400, "please select a video");

    const video = await Video.findById(new mongoose.Types.ObjectId(id));
    return res
                .status(200)
                .json(new ApiResponse(200, video, "video fetched successfully"))
});

const getFeed = asyncHandler(async (req, res) => {
    const videoData = await Video.aggregate([
        {
            $match: {isPublished: true}
        },
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
    ]);
    return res
                .status(200)
                .json(new ApiResponse(200, videoData, "Home feed fetched"));
});





export {upload_video, upload_thumbnail, getFeed, getVideo};