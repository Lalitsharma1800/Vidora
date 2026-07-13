import { Video } from "../model/video.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getFeed = asyncHandler(async (req, res) => {
  const page = parseInt(req.body.page, 10) || 1;
  const limit = parseInt(req.body.limit, 10) || 10;

  const mainPipeline = Video.aggregate([
    {
      $match: { isPublished: true },
    },
    {
      $sort: { createdAt: -1 },
    },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "channel",
        pipeline: [
          {
            $project: {
              userName: 1,
              fullName: 1,
              avatar: 1,
            },
          },
        ],
      },
    },
    {
      $unwind: {
        path: "$channel",
        preserveNullAndEmptyArrays: true,
      },
    },
  ]);

  const countPipeline = Video.aggregate([{ $match: { isPublished: true } }]);

  const options = {
    page,
    limit,
    countAggregation: countPipeline,
    customLabels: {
      docs: "videos",
    },
  };

  const result = await Video.aggregatePaginate(mainPipeline, options);

  return res
    .status(200)
    .json(new ApiResponse(200, result, "Home feed fetched successfully"));
});
