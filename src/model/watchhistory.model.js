import mongoose, { mongo } from "mongoose";
import { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const WatchHistory = new Schema(
                {
                  videoId: {
                    type: mongoose.Types.ObjectId,
                    required: true
                  },
                  userId: {
                    type: mongoose.Types.ObjectId,
                    required: true
                  },
                  progress: {
                    type: Number,
                    required: true
                  },
                },
                {timestamps: true}
);

mongoose.plugin(mongooseAggregatePaginate);
export const WatchHistory = mongoose.model("watchHistory", WatchHistory);