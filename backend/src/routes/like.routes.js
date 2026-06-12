import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { verifyUser } from "../middleware/auth.middleware.js";
import { 
    reactOnVideo, 
    reactStatus, 
    reactOnComment, 
    reactStatusOnComments, 
    reactOnReply 
} from "../controllers/like.controller.js";

const router = Router();

router.route("/video").post(verifyUser, reactOnVideo);
router.route("/video").get(verifyUser,reactStatus);
router.route("/comment").post(verifyUser, reactOnComment);
router.route("/comment").get(verifyUser,reactStatusOnComments);
router.route("/reply").post(verifyUser, reactOnReply);
router.route("/reply").get(verifyUser,reactStatusOnComments);

export default router;