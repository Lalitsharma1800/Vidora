import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const CommentReplySchema = new Schema(
                    {
                        commentId: {
                            type: mongoose.Types.ObjectId,
                            required: true,
                            ref: "Video_Comment"
                        },
                        userId: {
                            type: mongoose.Types.ObjectId,
                            required: true,
                            ref: "User"
                        },
                        likes: {
                            type: Number,
                            default: 0
                        },
                        disLike: {
                            type: Number,
                            default: 0       
                        },
                        reply: {
                            type: String,
                            required: true
                        },
                        replyCount: {
                            type: Number,
                            default: 0
                        }
                    },
                    {
                        timestamps: true
                    }
);
mongoose.plugin(mongooseAggregatePaginate);

export const Comment_Reply = mongoose.model("CommentReply", CommentReplySchema);