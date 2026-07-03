import { Router } from "express";
import { upload, upload_video_and_thumbnail } from "../middleware/multer.middleware.js";
import { verifyUser } from "../middleware/auth.middleware.js";
import {
        registerUser, 
        loginUser, 
        logout, 
        changePassword, 
        getCurrentUser, 
        updateAccountDetail, 
        updateAvatar, 
        updateCoverImage,
        refreshAccessToken,
        getChannelProfile,
        watchHistory
    } from "./../controllers/user.controller.js";
import {saveInHistory} from "../controllers/watch_history.controller.js";
import { upload_video, upload_thumbnail} from "../controllers/video.controller.js";
import { getFeed } from "../controllers/home_feed.controller.js";
import { getVideo } from "../controllers/watch.controller.js";
import { getSubscriberCountAndSubscribedStatus } from "../controllers/subscription.controller.js";

const router = Router();

router.route("/register").post(
                            upload.fields([
                                {
                                    name: "avatar",
                                    maxCount: 1
                                },
                                {
                                    name: "coverImage",
                                    maxCount: 1
                                }
                            ]),
                            registerUser
                        );

router.route("/login").post(loginUser);
router.route("/refreshAccessToken").post(refreshAccessToken);
router.route("/home").get(getFeed);

router.route("/video/:id").get(getVideo);

// securec routes
router.route("/logout").post(verifyUser, logout);
router.route("/changePassword").post(verifyUser, changePassword);
router.route("/uploadVideo").post(upload_video_and_thumbnail.single("video"),verifyUser,upload_video);
router.route("/upload-thumbnail").post(upload_video_and_thumbnail.single("thumbnail"),verifyUser,upload_video);

router.route("/save").post(verifyUser, saveInHistory);
router.route("/home").post(verifyUser,getSubscriberCountAndSubscribedStatus);
router.route("/getUser").get(verifyUser, getCurrentUser);
router.route("/channel/:username").get(verifyUser, getChannelProfile);
router.route("/history").get(verifyUser, watchHistory);


router.route("/updateAccountDetail").patch(verifyUser, updateAccountDetail);
router.route("/updateAvatar").patch(upload.single("avatar"), verifyUser, updateAvatar);
router.route("/updateCoverImage").patch(upload.single("coverImage"), verifyUser, updateCoverImage);
router.route("/changeThumbnail").patch(upload_video_and_thumbnail.single("thumbnail"), verifyUser, upload_thumbnail);


export default router;