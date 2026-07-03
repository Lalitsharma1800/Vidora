import {Video} from "../model/video.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


export const getFeed = asyncHandler(async (req, res) => {
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