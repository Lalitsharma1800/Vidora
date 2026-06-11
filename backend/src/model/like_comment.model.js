import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";


const likeCommentSchema = new Schema(
                    {
                        commentId: {
                            type: mongoose.Types.ObjectId,
                            required: true
                        },
                        userId: {
                            type: mongoose.Types.ObjectId,
                            required: true
                        },
                        reaction: {
                            type: String,
                            enum: {
                                values: ['LIKE', 'DISLIKE'],
                                message: '{VALUE} is not a valid reaction type'
                            },
                            required: true
                        }
                    },
                    {
                        timestamps: true
                    }
);
mongoose.plugin(mongooseAggregatePaginate);

export const LikeComment = mongoose.model("LikeComment", likeCommentSchema);