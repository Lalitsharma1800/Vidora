import mongoose, {Schema} from "mongoose";
import { User } from "./username.model.js";


const subscriptionSchema = new Schema(
        {
            subscriber: {    // jisne subscribe kiya
                type: Schema.Types.ObjectId,
                ref: User
            },
            channel: {      // jisko subscribe kiya
                type: Schema.Types.ObjectId,
                ref: User
            }
        });
