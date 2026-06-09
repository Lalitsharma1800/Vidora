import mongoose from "mongoose";
import {User} from "./../model/username.model.js";
import {Video} from "./../model/video.model.js";
import {Video_Comment} from "./../model/video_comment.model.js";
import { Comment_Reply } from "../model/comment_reply.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "./../utils/apiError.js";
import {ApiResponse} from "./../utils/apiResponse.js";

const writeReply = asyncHandler(async (req, req) => {
    const {commentId, reply} = req.body;
    if(!mongoose.Types.ObjectId.isValid(commentId)) throw new ApiError("comment id is invalid");
    const user = req.user;
    const comment = await Video_Comment.findById(commentId);
    if(!comment) throw new ApiError(404,"comment not available");
    const session = await mongoose.startSession();
    try{
        await session.startTransaction();
        const write_reply = await Comment_Reply.create([{commentId: comment._id, userId: user._id, reply: reply}], {session});
        if(!write_reply)  throw new ApiError("writing reply failed");
        const update_reply_count = await Video.findByIdAndUpdate(Video_Comment._id,{$inc: {reply: +1}}, {session, returnDocument: "after"});
        if(!update_reply_count) throw new ApiError("something went wrong while writing the reply");
        await session.commitTransaction();
        return res
                .status(200)
                .json(new ApiResponse(200, {reply_count: update_reply_count, reply: write_reply}, "replied successfully commited"));
    }
    catch (error) {
        await session.abortTransaction();
        throw new ApiError(500, "something went wrong while writing reply");
    }
    finally{
        await session.endSession();
    }
});

const editReply = asyncHandler(async (req, req) => {
    const {replyId, edited_reply} = req.body;
    const user = req.user;
    if(!mongoose.Types.ObjectId.isValid(replyId)) throw new ApiError("reply id is invalid");
    if(!edited_reply) throw new ApiError(400, "edited reply required");
    const reply = await Comment_Reply.findById(commentId);
    if(!reply) throw new ApiError(404,"comment not available");
    const edit_reply = await Video_Comment.findByIdAndUpdate(replyId,{reply: edited_reply},{returnDocument: "after"});
    if(!edit_reply)  throw new ApiError(500,"edit reply failed");

    return res
            .status(200)
            .json(new ApiResponse(200, {newReply: edit_reply}, "reply edited successfully"));
});