import { Router } from "express";
import { verifyUser } from "../middleware/auth.middleware.js";
import { toggle_subscribe } from "../controllers/subscription.controller.js";

const router = Router();

router.use(verifyUser)
router.route("/:id").get(toggle_subscribe)
                    .post(toggle_subscribe)

export default router;