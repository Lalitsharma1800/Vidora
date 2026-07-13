import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const likeVideoSchema = new Schema(
  {
    videoId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Video",
    },
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    reaction: {
      type: String,
      enum: {
        values: ["LIKE", "DISLIKE"],
        message: "{VALUE} is not a valid reaction type",
      },
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
mongoose.plugin(mongooseAggregatePaginate);

export const LikeVideo = mongoose.model("LikeVideo", likeVideoSchema);
