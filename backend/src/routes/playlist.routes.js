import { Router } from "express";
import { verifyUser } from "../middleware/auth.middleware.js";
import { 
    createPlaylist, 
    deletePlaylist, 
    getUserPlaylists, 
    getPlaylistById, 
    updatePlaylist 
} from "../controllers/playlist.controller.js";

const router = Router();

router.get("/:playlistId", getPlaylistById);

// verified path

router.post("/create", verifyUser, createPlaylist);
router.delete("/delete/:playlistId", verifyUser, deletePlaylist);
router.get("/user-playlists", verifyUser, getUserPlaylists);
router.put("/update/:playlistId", verifyUser, updatePlaylist);

export default router;
