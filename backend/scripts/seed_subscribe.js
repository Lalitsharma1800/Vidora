import mongoose from "mongoose";
import connectDB from "../src/db/dbConnection.js";
import { User } from "../src/model/username.model.js";
import { Subscription } from "../src/model/subscription.model.js";



/**
===================================
900 subscriber of a channel
==================================
 */
const channel = new mongoose.Types.ObjectId("6a3beb12124230a7dee407fc");

async function seed_subscribe_oneChannel(){ //one channel subscribed by 999 users
    try {
        await connectDB(); 
        const users = await User.find({}, "_id").limit(1000).lean();
        let subscriptions = [];

        for(let user of users){
            if (channel.equals(user._id)) continue;
            subscriptions.push({
                subscriber: user._id,
                channel: channel
            });
        }
        await Subscription.insertMany(subscriptions,{ ordered: false });
        await mongoose.connection.close();
        console.log(`channel subscribed with ${subscriptions.length} subscribers`);
        process.exit(0);
    }
    catch(error){
        console.error(error);
        process.exit(1);
    }
};
// await seed_subscribe_oneChannel();

/**
===================================
100 channels subscribed by an user
==================================
 */
const user = new mongoose.Types.ObjectId("6a3beb12124230a7dee407fc");

async function seed_subscribed_byUser(){ // 100 channel subscribed by an user
    try {
        await connectDB(); 
        const channels = await User.find({}, "_id").limit(101).lean();
        let subscriptions = [];

        for(let channel of channels){
            if (user.equals(channel._id)) continue;
            subscriptions.push({
                channel: channel._id,
                subscriber: user
            });
        }
        await Subscription.insertMany(subscriptions,{ ordered: false });
        await mongoose.connection.close();
        console.log(`${subscriptions.length} subscribed by user`);
        process.exit(0);
    }
    catch(error){
        console.error(error);
        process.exit(1);
    }
}
// await seed_subscribed_byUser();

// await connectDB(); 
// ============== UPDATE THE SUBSCRIBER COUNT =============
// const subsCount = await User.findByIdAndUpdate(channel, {subscriberCount: 999}, {returnDocument: "after"}).select("subscriberCount");
// console.log(subsCount);
// ============== UPDATE THE SUBSCRIBED-TO-COUNT ==========
// const subsToCount = await User.findByIdAndUpdate(channel, {subscribedToCount: 100}, {returnDocument: "after"}).select("subscribedToCount");
// console.log(subsToCount);
// await mongoose.connection.close();
// process.exit(0);