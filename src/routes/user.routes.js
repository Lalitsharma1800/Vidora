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
        getChannelProfile
    } from "./../controllers/user.controller.js";
import {toggle_subscribe,} from "./../controllers/subscription.controller.js";


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

// securec routes
router.route("/logout").post(verifyUser, logout);
router.route("/changePassword").post(verifyUser, changePassword);

router.route("/getUser").get(verifyUser, getCurrentUser);
router.route("/channel/:username").get(verifyUser, getChannelProfile);

router.route("/updateAccountDetail").patch(verifyUser, updateAccountDetail);
router.route("/updateAvatar").patch(upload.single("avatar"), verifyUser, updateAvatar);
router.route("/updateCoverImage").patch(upload.single("coverImage"), verifyUser, updateCoverImage);


export default router;