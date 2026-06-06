import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
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
import { uploadVideo, getFeed, saveInHistory, getSubscriberCount, changeThumbnail, getVideo } from "../controllers/video.controller.js";


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
router.route("/uploadVideo").post(
                            upload.fields([
                                {
                                    name: "video",
                                    maxCount: 1
                                },
                                {
                                    name: "thumbnail",
                                    maxCount: 1
                                }
                            ]),
                            verifyUser,
                            uploadVideo
                        );

router.route("/save").post(verifyUser, saveInHistory);
router.route("/home").post(verifyUser,getSubscriberCount);
router.route("/getUser").get(verifyUser, getCurrentUser);
router.route("/channel/:username").get(verifyUser, getChannelProfile);
router.route("/history").get(verifyUser, watchHistory);


router.route("/updateAccountDetail").patch(verifyUser, updateAccountDetail);
router.route("/updateAvatar").patch(upload.single("avatar"), verifyUser, updateAvatar);
router.route("/updateCoverImage").patch(upload.single("coverImage"), verifyUser, updateCoverImage);
router.route("/changeThumbnail").patch(upload.single("thumbnail"), verifyUser, changeThumbnail);


export default router;