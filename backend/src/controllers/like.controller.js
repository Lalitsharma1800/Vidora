import mongoose from "mongoose";
import { User } from "../model/username.model.js";
import { Video} from "../model/video.model.js";
import {LikeComment} from "../model/like_comment.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { LikeVideo } from "../model/like.model.js";
import { Video_Comment } from "../model/video_comment.model.js";
import {Comment_Reply} from "../model/comment_reply.model.js";

const reactOnVideo = asyncHandler(async (req, res) => {
    // get the video id from req
    const {videoId} = req.body;
    const {reaction} = req.body;
    if(reaction !== "LIKE" && reaction !== "DISLIKE") throw new ApiError(400, "reaction required either LIKE or DISLIKE"); 
    
    if(!mongoose.Types.ObjectId.isValid(videoId)) throw new ApiError(400, "like & dislike only valid for videos");
    
    const user = req.user;
    
    const video = await Video.findById(new mongoose.Types.ObjectId(videoId));
    
    if(!video) throw new ApiError(404, "Video not found, Invalid video Id");
    // start the session
    const session = await mongoose.startSession();
    try{
        // start the transaction
        await session.startTransaction();
        
        const existing = await LikeVideo.findOne({userId: user._id , videoId: video._id}).session(session);
        let reactOnVideo;

        if(!existing){ // if reaction not existed
             reactOnVideo = await LikeVideo.create([{"videoId" : video._id, "userId" : user._id, "reaction" : reaction}], {session});
             if(!reactOnVideo) throw new ApiError(500, `something went wrong while first time reacting on the video`);
             const likeCount = (reaction === 'LIKE') ? await Video.findByIdAndUpdate(video._id, {$inc: {likes: 1}}, {returnDocument: "after", session: session}).select("likes disLikes")   : await Video.findByIdAndUpdate(video._id, {$inc: {disLikes: 1}}, {returnDocument: "after"}).select("likes disLikes").session(session) ;
             await session.commitTransaction();
             return res
                        .status(200)
                        .json(new ApiResponse(200, [reactOnVideo,likeCount], "reaction successfully registered"));
        }else{ // if reaction  existed
            if(existing.reaction === reaction){ // if this reaction = registered reaction => user is neutral 
                reactOnVideo = await LikeVideo.findByIdAndDelete(existing._id, {session});
                if(!reactOnVideo) throw new ApiError(500, `something wront went while deleting the reaction`);
                const likeCount = (reaction === 'LIKE') ? await Video.findByIdAndUpdate(video._id, {$inc: {likes: -1}}, {returnDocument: "after", session: session}).select("likes disLikes") : await Video.findByIdAndUpdate(video._id, {$inc: {disLikes: -1}}, {returnDocument: "after", session: session}).select("likes disLikes") ;
                await session.commitTransaction();
                return res
                        .status(200)
                        .json(new ApiResponse(200, [reactOnVideo,likeCount], "reaction successfully registered"));
            }else{ // if this reaction != registered reaction => user changed his reaction
                reactOnVideo = await LikeVideo.findByIdAndUpdate(existing._id, {$set: {reaction: reaction}}, {returnDocument: "after", session: session});
                if(!reactOnVideo) throw new ApiError(500, `something wront went while changing the video`);
                const likeCount = (reaction === 'LIKE') ? await Video.findByIdAndUpdate(video._id, {$inc: {likes: 1, disLikes: -1}}, {returnDocument: "after", session: session}).select("likes disLikes") : await Video.findByIdAndUpdate(video._id, {$inc: {likes: -1, disLikes: 1}}, {returnDocument: "after", session: session}).select("likes disLikes");
                await session.commitTransaction();
                return res
                            .status(200)
                            .json(new ApiResponse(200, [reactOnVideo,likeCount], "reaction successfully registered"));
            }
        }
    } catch (error) {
        await session.abortTransaction();
        console.log(error)
        throw new ApiError(500, "something went wrong while reacting on the video");
    }
    finally{
        await session.endSession();
    }
});

const reactStatus = asyncHandler(async (req, res) => {
    const {videoId} = req.body;
    if(!mongoose.Types.ObjectId.isValid(videoId)) throw new ApiError("Video required");

    const user = req.user;
    const existing = await LikeVideo.findOne({userId: user._id , videoId: new mongoose.Types.ObjectId(videoId)});

    return res
            .status(200)
            .json(new ApiResponse(200, existing, "reactStatus fetched successfully"));    
});
/**
    * react on comment & reply  are the same in the logic but they are different in the model, so I will use the same logic of react on video with some changes to fit the comment model
     * 1- I will check if the comment id is valid and exist or not 
     * 2- I will check if the user already reacted on this comment or not
 */
const reactOnComment = asyncHandler(async (req, res) => {
    const {commentId} = req.body;
    const {reaction} = req.body;
    if(reaction !== "LIKE" && reaction !== "DISLIKE") throw new ApiError(400, "reaction required either LIKE or DISLIKE"); 
    if(!mongoose.Types.ObjectId.isValid(commentId)) throw new ApiError(400, "like & dislike only valid for comments");
    const user = req.user;
    const comment = await Video_Comment.findById(new mongoose.Types.ObjectId(commentId));
    if(!comment) throw new ApiError(404, "Comment not found, Invalid comment Id");
        // start the session
    const session = await mongoose.startSession();
    try{
        // start the transaction
        await session.startTransaction();
        const existing = await LikeComment.findOne({userId: user._id , commentId: comment._id}).session(session);
        let reactOnComment; 
        if(!existing){ // if reaction not existed
             reactOnComment = await LikeComment.create([{"commentId" : comment._id, "userId" : user._id, "reaction" : reaction}], {session});
             if(!reactOnComment) throw new ApiError(500, `something went wrong while first time reacting on the comment`);
             const likeCount = (reaction === 'LIKE') ? await Comment.findByIdAndUpdate(comment._id, {$inc: {likes: 1}}, {returnDocument: "after", session: session}).select("likes disLikes")   : await Comment.findByIdAndUpdate(comment._id, {$inc: {disLikes: 1}}, {returnDocument: "after"}).select("likes disLikes").session(session) ;
                await session.commitTransaction();
                return res
                        .status(200)
                        .json(new ApiResponse(200, [reactOnComment,likeCount], "reaction successfully registered"));
        }else{ // if reaction  existed
            if(existing.reaction === reaction){ // if this reaction = registered reaction => user is neutral 
                reactOnComment = await LikeComment.findByIdAndDelete(existing._id, {session}); 
                if(!reactOnComment) throw new ApiError(500, `something wront went while deleting the reaction`);
                const likeCount = (reaction === 'LIKE') ? await Comment.findByIdAndUpdate(comment._id, {$inc: {likes: -1}}, {returnDocument: "after", session: session}).select("likes disLikes") : await Comment.findByIdAndUpdate(comment._id, {$inc: {disLikes: -1}}, {returnDocument: "after", session: session}).select("likes disLikes") ;
                await session.commitTransaction();
                return res
                        .status(200)
                        .json(new ApiResponse(200, [reactOnComment,likeCount], "reaction successfully registered"));
            }else{ // if this reaction != registered reaction => user changed his reaction  
                reactOnComment = await LikeComment.findByIdAndUpdate(existing._id, {reaction}, {new: true, session});
                if(!reactOnComment) throw new ApiError(500, `something went wrong while updating the reaction`);
                const likeCount = (reaction === 'LIKE') ? await Comment.findByIdAndUpdate(comment._id, {$inc: {likes: 1, disLikes: -1}}, {returnDocument: "after", session: session}).select("likes disLikes") : await Comment.findByIdAndUpdate(comment._id, {$inc: {disLikes: 1, likes: -1}}, {returnDocument: "after", session: session}).select("likes disLikes") ;
                await session.commitTransaction();
                return res
                        .status(200)
                        .json(new ApiResponse(200, [reactOnComment,likeCount], "reaction successfully registered"));
            }
        }
    }catch(error){
        await session.abortTransaction();
        throw new ApiError(500, "something went wrong while reacting on the comment");
    }finally{
        await session.endSession();
    }
});

const reactOnReply = asyncHandler(async (req, res) => {
    const {replyId} = req.body;
    const {reaction} = req.body;
    if(reaction !== "LIKE" && reaction !== "DISLIKE") throw new ApiError(400, "reaction required either LIKE or DISLIKE"); 
    if(!mongoose.Types.ObjectId.isValid(replyId)) throw new ApiError(400, "like & dislike only valid for replies");
    const user = req.user;
    const reply = await Comment_Reply.findById(new mongoose.Types.ObjectId(replyId));
    if(!reply) throw new ApiError(404, "Reply not found, Invalid reply Id");
        // start the session
    const session = await mongoose.startSession();
    try{
        // start the transaction
        await session.startTransaction();
        const existing = await LikeComment.findOne({userId: user._id , commentId: reply._id}).session(session);
        let reactOnComment; 
        if(!existing){ // if reaction not existed
             reactOnComment = await LikeComment.create([{"commentId" : reply._id, "userId" : user._id, "reaction" : reaction}], {session});
             if(!reactOnComment) throw new ApiError(500, `something went wrong while first time reacting on the comment`);
             const likeCount = (reaction === 'LIKE') ? await Comment_Reply.findByIdAndUpdate(reply._id, {$inc: {likes: 1}}, {returnDocument: "after", session: session}).select("likes disLikes")   : await Comment_Reply.findByIdAndUpdate(reply._id, {$inc: {disLikes: 1}}, {returnDocument: "after"}).select("likes disLikes").session(session) ;
                await session.commitTransaction();
                return res
                        .status(200)
                        .json(new ApiResponse(200, [reactOnComment,likeCount], "reaction successfully registered"));
        }else{ // if reaction  existed
            if(existing.reaction === reaction){ // if this reaction = registered reaction => user is neutral 
                reactOnComment = await LikeComment.findByIdAndDelete(existing._id, {session}); 
                if(!reactOnComment) throw new ApiError(500, `something wront went while deleting the reaction`);
                const likeCount = (reaction === 'LIKE') ? await Comment_Reply.findByIdAndUpdate(reply._id, {$inc: {likes: -1}}, {returnDocument: "after", session: session}).select("likes disLikes") : await Comment_Reply.findByIdAndUpdate(reply._id, {$inc: {disLikes: -1}}, {returnDocument: "after", session: session}).select("likes disLikes") ;
                await session.commitTransaction();
                return res
                        .status(200)
                        .json(new ApiResponse(200, [reactOnComment,likeCount], "reaction successfully registered"));
            }else{ // if this reaction != registered reaction => user changed his reaction  
                reactOnComment = await LikeComment.findByIdAndUpdate(existing._id, {reaction}, {new: true, session});
                if(!reactOnComment) throw new ApiError(500, `something went wrong while updating the reaction`);
                const likeCount = (reaction === 'LIKE') ? await Comment_Reply.findByIdAndUpdate(reply._id, {$inc: {likes: 1, disLikes: -1}}, {returnDocument: "after", session: session}).select("likes disLikes") : await Comment_Reply.findByIdAndUpdate(reply._id, {$inc: {disLikes: 1, likes: -1}}, {returnDocument: "after", session: session}).select("likes disLikes") ;
                await session.commitTransaction();
                return res
                        .status(200)
                        .json(new ApiResponse(200, [reactOnComment,likeCount], "reaction successfully registered"));
            }
        }
    }catch(error){
        await session.abortTransaction();
        throw new ApiError(500, "something went wrong while reacting on the reply");
    }finally{
        await session.endSession();
    }
});

const reactStatusOnComments = asyncHandler(async (req, res) => {
    const {commentId} = req.body; // for reply we change the commentId to replyId and change the model to likeReply
    if(!mongoose.Types.ObjectId.isValid(commentId)) throw new ApiError("Comment required");

    const user = req.user;
    const existing = await LikeComment.findOne({userId: user._id , commentId: new mongoose.Types.ObjectId(commentId)});

    return res
            .status(200)
            .json(new ApiResponse(200, existing, "reactStatusOnComments fetched successfully"));    
});

export {reactOnVideo, reactStatus, reactOnComment, reactStatusOnComments, reactOnReply};