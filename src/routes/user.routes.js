import { Router } from "express";
import {registerUser, loginUser, logout, changePassword} from "./../controllers/user.controller.js"
import { upload } from "../middleware/multer.middleware.js";
import { verifyUser } from "../middleware/auth.middleware.js";


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

router.route("/login").post(
    loginUser
)

// securec routes
router.route("/logout").post(verifyUser, logout);
router.route("/changePassword").post(verifyUser, changePassword);

export default router;