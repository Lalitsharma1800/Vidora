import mongoose from "mongoose";
import { User } from "../model/username.model.js";
import { Subscription } from "../model/subscription.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";

const toggle_subscribe = asyncHandler(async (req, res) => {
    
    const {id} = req.params;
    if(!id || id === `""` || id === ":id") throw new ApiError(400, "channel required");

    const channel = await User.findById(id);
    if(!channel) throw new ApiError(400, "channel not found");
    if(channel._id.equals(req.user._id)) throw new ApiError(400, "Own channel cannot subscibed");

    const isSubscribed = await Subscription.findOne({"channel" : channel._id, "subscriber" : req.user._id});
    let toggle_subscription;
    
    if(isSubscribed){
        toggle_subscription = await Subscription.findByIdAndDelete(isSubscribed._id);
        if(!toggle_subscription) throw new ApiError(500, "Something went wrong while Unsubscribing");
        return res
                    .status(200)
                    .json(new ApiResponse(200, "channel Unsubscribed successfully"));
    };
    toggle_subscription = await Subscription.create({"channel": channel._id, "subscriber" : req.user._id});
    if(!toggle_subscription) throw new ApiError(500, "Something went wrong while subscribing");

    return res
                .status(200)
                .json(new ApiResponse(200, "channel subscribed successfully"));
});

const getSubscriberList = asyncHandler(async (req, res) => {
    const user = req.user;

    const subscriberList = await Subscription.find({channel: user._id}).select("-channel");
    console.log(subscriberList);
    const count = subscriberList.length;
    return res
                .status(200)
                .json(new ApiResponse(200, {count, subscriberList}, "subscribers fetched successfully"))
});

const getSubscribedToList = asyncHandler(async (req, res) => {
    const user = req.user;

    const subscribedToList = await Subscription.find({subscriber: user._id}).select("-subscriber");
    const count = subscribedToList.length;
    return res
                .status(200)
                .json(new ApiResponse(200, {count, subscribedToList}, "following fetched successfully"))
});

export {toggle_subscribe, getSubscriberList, getSubscribedToList};
