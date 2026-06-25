import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { User } from "../src/model/username.model.js";
import connectDB from "../src/db/dbConnection.js";

const TOTAL_USERS = 5000;

async function seedUsers() {
    try {
        await connectDB();
        await User.deleteMany({});      
        const hashedPassword = await bcrypt.hash("Password@123", 10);
        const users = [];
        for (let i = 1; i <= TOTAL_USERS; i++) {
            users.push({
                userName: `channel_${i}`,
                email: `usernameEmail${i}@gmail.com`,
                fullName: `fullname${i}`,
                password: hashedPassword,
                joinedAt: new Date(
                    Date.now() -
                    Math.floor(Math.random() * 5 * 365 * 24 * 60 * 60 * 1000)
                )
            });
        }
       
        await User.insertMany(users,{
                    ordered: false
                });
        console.log(`Inserted ${TOTAL_USERS} users successfully`);
        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}
seedUsers();