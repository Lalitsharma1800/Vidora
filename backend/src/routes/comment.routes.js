import Router from "express";
import {verifyUser} from "../middleware/auth.middleware.js";
import {
    writeComment,
    editComment,
    findComments,
} from "../controllers/video_comment.controller.js";
import {
    writeReply,
    editReply,
    findReplies,
} from "../controllers/reply_comment.controller.js";


const router = Router();

// unverified routes
router.get("/findcomments", findComments);
router.get("/findreplies", findReplies);

// verified routes
router.post("/writecomment", verifyUser, writeComment);
router.post("/writereply", verifyUser, writeReply);
router.put("/editcomment",verifyUser, editComment);
router.put("/editreply", verifyUser, editReply);

export default router;
