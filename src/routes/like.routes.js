import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { verifyUser } from "../middleware/auth.middleware.js";
import { reactOnVideo, reactStatus } from "../controllers/like.controller.js";

const router = Router();

router.route("").post(verifyUser, reactOnVideo);
router.route("").get(verifyUser,reactStatus);

export default router;