import mongoose from "mongoose";
import { Video } from ".././model/video.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getVideo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) throw new ApiError(400, "please select a video");

  const video = await Video.findById(new mongoose.Types.ObjectId(id));
  return res
    .status(200)
    .json(new ApiResponse(200, video, "video fetched successfully"));
});
