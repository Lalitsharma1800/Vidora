import mongoose from "mongoose";
import Connection  from "mongoose";
import { db_name } from "./../constant.js";

const connectDB = async () => {
    try{
        console.log("connecting..")
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${db_name}`);
        console.log(`connected successfully \nHost: ${connectionInstance.connection.host}`);
    }
    catch(error){
        console.error(error);
        process.exit(1);
    }
};

export default connectDB;