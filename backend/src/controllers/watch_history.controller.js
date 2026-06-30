import mongoose from "mongoose";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { WatchHistory } from "../model/watchhistory.model.js";

export const saveInHistory = asyncHandler(async (req, res) => {
    const {videoId} = req.body;
    if(!mongoose.Types.ObjectId.isValid(videoId)) throw new ApiError(400, "Invalid video");
    if(!mongoose.Types.ObjectId.isValid(req.user?._id)) throw new ApiError(400, "Invalid video");

    const progress = req.progress || 0;

    let history = await WatchHistory.findOneAndUpdate({videoId:new mongoose.Types.ObjectId(videoId), userId: req.user._id},{$set:{progress: progress, lastWatchedAt: new Date()}}, {returnDocument: "after", upsert: true});

    if(!history) throw new ApiError(500, "Something went wrong while saving the video in history");
    
    return res
                .status(200)
                .json(new ApiResponse(200,null, "video saved in history successfully"))
});
