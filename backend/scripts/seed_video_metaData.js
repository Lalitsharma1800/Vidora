import mongoose from "mongoose";
import connectDB from "../src/db/dbConnection.js";
import { User } from "../src/model/username.model.js";
import { Video } from "../src/model/video.model.js";

/**
  ======================
    10 USER 10 VIDEO
  ======================
 */
const thumbnail_array = [
  "eHTXQW58WhA",
  "D3CU_3z1U-I",
  "VPz9NGNmUcw",
  "ltr53a7H8Do",
  "OAlzBhCQKE8",
  "E-F5XJ2jJ1k",
  "sxRE2LrMBH0",
  "dQw4w9WgXcQ",
  "jNQXAC9IVRw",
  "9bZkp7q19f0",
  "34Na4j8AVgA",
  "UywjJKy048A", 
  "XqZsoesa55w", 
  "nu_pCVPKzTk", 
  "G7KNmW9a75Y",
  "V1bFr2SWP1I", 
  "f7T_9WfA7Ww", 
  "W7h-Y9Mc6U0", 
  "I_2D8Eo15wE",
  "EXgY-O1Z6b0",
  "hHW1oY26kxQ", 
  "L_LUpnjgPso", 
  "OPf0YbXqDm0", 
  "YQHsXMglC9A", 
  "JGwWNGJdvx8",
  "kXYiU_JCYtU", 
  "RgKAFK5djSk", 
  "7PCkvCpR0o4", 
  "W6NZfCO5SIk", 
  "fHiGbolffGw",
  "K4TOd4K9gU4", 
  "v2AC41dglnM", 
  "Zi_XLOBDo_Y", 
  "t42gO37p_Fw", 
  "M7lc1UVf-VE",
  "eW7Twd85m2g", 
  "z8782Vb_GgA", 
  "3JZ_D3ELwOQ", 
  "S9uTScSgzrM",
  "tlm-M19oR7g",
  "yv8v7Z09N0k", 
  "h8SjAlwXq3U", 
  "v7ZOn-2P9Zc", 
  "P8MymfP_Ots", 
  "fKopy74weus",
  "ZArED8NInP4", 
  "r8eLgUv3h7k", 
  "fLexgOxsZu0", 
  "1w7OgIMMRc4", 
  "YlE_k6S1C_A"
];

const TOTAL_VIDEOS = 50;

async function seed_video_metadata() {
  try {
    await connectDB();

    await Video.deleteMany({});

    const channels = await User.find({}, "_id").limit(50).lean();

    const videos = [];

    for (let i = 0; i < TOTAL_VIDEOS; i++) {
      videos.push({
        videoFile:
          "https://res.cloudinary.com/dy91w5jjf/video/upload/v1783011234/38391220_cbambu.mp4",
        thumbnail: `https://img.youtube.com/vi/${thumbnail_array[i]}/maxresdefault.jpg`,
        title: `Video Title ${i + 1}`,
        description: `Description for video ${i + 1}`,
        duration: 13,
        views: 0,
        likes: 0,
        disLikes: 0,
        comments: 0,
        share: 0,
        isPublished: true,
        owner: channels[i % channels.length]._id,
      });
    }
    await Video.insertMany(videos);
    console.log(`${videos.length} videos inserted successfully`);
    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
seed_video_metadata();