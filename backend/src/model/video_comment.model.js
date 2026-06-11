import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoCommentSchema = new Schema(
                    {
                        videoId: {
                            type: mongoose.Types.ObjectId,
                            required: true
                        },
                        userId: {
                            type: mongoose.Types.ObjectId,
                            required: true
                        },
                        likes: {
                            type: Number,
                            default: 0,
                        },
                        disLike: {
                            type: Number,
                            default: 0, 
                        },
                        comment: {
                            type: String,
                            required: true
                        },
                        reply: {
                            type: Number,
                            default: 0
                        }
                    },
                    {
                        timestamps: true
                    }
);
mongoose.plugin(mongooseAggregatePaginate);

export const Video_Comment = mongoose.model("videoComment", videoCommentSchema);
