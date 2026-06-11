import { Router } from "express";
import { verifyUser } from "../middleware/auth.middleware.js";
import { toggle_subscribe, getSubscriberList, getSubscribedToList } from "../controllers/subscription.controller.js";

const router = Router();

router.use(verifyUser)
router.route("/:id").post(toggle_subscribe);
router.route("/subscribers").get(getSubscriberList);
router.route("/subscribedChannels").get(getSubscribedToList);

export default router;