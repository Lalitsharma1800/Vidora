import mongoose from "mongoose";
import { User } from "../model/username.model.js";
import { Subscription } from "../model/subscription.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";

const toggle_subscribe = asyncHandler(async (req, res) => {
    
    const {id} = req.params;
    if(!id || id === `""` || id === ":id") throw new ApiError(400, "channel required");
    const session = await mongoose.startSession();
    try {
    await session.startTransaction()
    
    const channel = await User.findById(id).session(session);
    if(!channel) throw new ApiError(400, "channel not found");
    if(channel._id.equals(req.user._id)) throw new ApiError(400, "Own channel cannot subscibed");

    const isSubscribed = await Subscription.findOne({"channel" : channel._id, "subscriber" : req.user._id}).session(session);
    let toggle_subscription;
    
    if(isSubscribed){
        toggle_subscription = await Subscription.findByIdAndDelete(isSubscribed._id).session(session);
        if(!toggle_subscription) throw new ApiError(500, "Something went wrong while Unsubscribing");
        await session.commitTransaction();
        return res
                    .status(200)
                    .json(new ApiResponse(200, "channel Unsubscribed successfully"));
    };
    toggle_subscription = await Subscription.create([{"channel": channel._id, "subscriber" : req.user._id}], {session});
    if(!toggle_subscription) throw new ApiError(500, "Something went wrong while subscribing").session(session);
    await session.commitTransaction();
    return res
                .status(200)
                .json(new ApiResponse(200, "channel subscribed successfully"));
    } catch (error) {
        await session.abortTransaction();
        throw new ApiError(500, "something went wrong while subscription");
    }
    finally{
        await session.endSession();
    }
});

const getSubscriberList = asyncHandler(async (req, res) => {
    const user = req.user;

    const subscriberList = await Subscription.find({channel: user._id}).select("-channel");
    const count = await User.findById(user._id).select("subscriberCount");
    return res
                .status(200)
                .json(new ApiResponse(200, {count, subscriberList}, "subscribers fetched successfully"));
});

const getSubscribedToList = asyncHandler(async (req, res) => {
    const user = req.user;

    const subscribedToList = await Subscription.find({subscriber: user._id}).select("-subscriber");
    const count = await User.findById(user._id).select("subscribedToCount");
    return res
                .status(200)
                .json(new ApiResponse(200, {count, subscribedToList}, "following fetched successfully"))
});
const getSubscriberCountAndSubscribedStatus = asyncHandler(async (req, res) => {
    const {channelId} = req.body;
    if(!mongoose.Types.ObjectId.isValid(channelId)) throw new ApiError(400, "please enter select a channel");
    const userId = req.user._id;
    const subscriberCount = await Subscription.countDocuments({channel:new mongoose.Types.ObjectId(channelId)});
    const isSubscribed = await Subscription.findOne({channel: new mongoose.Types.ObjectId(channelId), subscriber: new mongoose.Types.ObjectId(userId)}) || false;
    return res
                .status(200)
                .json(new ApiResponse(200, {subscriberCount, isSubscribed}, "subscriberCount & subscribedStatus fetched successfully"));
});

export {toggle_subscribe, getSubscriberList, getSubscribedToList, getSubscriberCountAndSubscribedStatus};
