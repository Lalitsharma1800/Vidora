import mongoose, { mongo } from "mongoose";
import { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const Watch_History = new Schema(
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
    progress: {
      type: Number,
      required: true,
    },
    lastWatchedAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

mongoose.plugin(mongooseAggregatePaginate);
export const WatchHistory = mongoose.model("watch_History", Watch_History);
