import mongoose from "mongoose";
import { User } from "./../model/username.model.js";
import { Video } from "../model/video.model.js";
import { Video_Comment } from "./../model/video_comment.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "./../utils/apiError.js";
import { ApiResponse } from "./../utils/apiResponse.js";

const writeComment = asyncHandler(async (req, res) => {
  const { videoId } = req.body;
  if (!mongoose.Types.ObjectId.isValid(videoId))
    throw new ApiError(400, "video id is invalid");
  const { comment } = req.body;
  const user = req.user;
  const video = await Video.findById(videoId);
  if (!video) throw new ApiError(404, "video not available");
  const session = await mongoose.startSession();
  try {
    await session.startTransaction();
    const write_comment = await Video_Comment.create(
      [{ videoId: video._id, userId: user._id, comment: comment }],
      { session },
    );
    if (!write_comment) throw new ApiError(500, "writing comment failed");
    const update_comment_count = await Video.findByIdAndUpdate(
      video._id,
      { $inc: { comment: +1 } },
      { session, returnDocument: "after" },
    );
    if (!update_comment_count)
      throw new ApiError(500, "something went wrong while writing the comment");
    await session.commitTransaction();
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { comment_count: update_comment_count },
          "comment successfully commited",
        ),
      );
  } catch (error) {
    await session.abortTransaction();
    throw new ApiError(500, "something went wrong while writing comment");
  } finally {
    await session.endSession();
  }
});

const editComment = asyncHandler(async (req, res) => {
  const { commentId, newComment } = req.body;
  if (!mongoose.Types.ObjectId.isValid(commentId))
    throw new ApiError(400, "commentId is not invalid");
  if (!newComment) throw new ApiError(400, "please enter a valid new comment");
  const user = req.user;
  const comment = await Video_Comment.findById(commentId);
  if (!comment) throw new ApiError(404, "comment not found");
  const edit_comment = await Video_Comment.findByIdAndUpdate(
    commentId,
    { comment: newComment },
    { returnDocument: "after" },
  );
  if (!edit_comment) throw new ApiError(500, "edit comment failed");

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { comment_count: update_comment_count },
        "comment edited successfully",
      ),
    );
});

const findComments = asyncHandler(async (req, res) => {
  const { videoId } = req.body;
  if (!mongoose.Types.ObjectId.isValid(videoId))
    throw new ApiError(400, "video id is invalid");

  const comments = await Video_Comment.aggregate([
    {
      $match: { videoId: new mongoose.Types.ObjectId(videoId) },
    },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
        pipeline: [
          {
            $project: {
              userName: 1,
              avatar: 1,
              fullName: 1,
            },
          },
        ],
      },
    },
  ]);
  return res
    .status(200)
    .json(new ApiResponse(200, comments, "comments fetched successfully"));
});
export { writeComment, editComment, findComments };
