import PlayList from '../models/playlist.model.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

const createPlaylist = asyncHandler(async (req, res) => {
    const {name, description} = req.body;
    const userId = req.user._id;
    const playlist = await PlayList.create({name, description, user: userId});
    if(!playlist) {
        throw new ApiError(400, "Failed to create playlist");
    }
    return res.status(200).json(new ApiResponse(200, playlist, "Playlist created successfully"));
});

const addVideoToPlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params;
    const {videoId} = req.body;
    const playlist = await PlayList.findById(playlistId);
    if(!playlist) {
        throw new ApiError(400, "Playlist not found");
    }
    if(playlist.videos.includes(videoId)) {
        throw new ApiError(400, "Video already in playlist");
    }
    playlist.videos.push(videoId);
    await playlist.save();
    return res.status(200).json(new ApiResponse(200, playlist, "Video added to playlist successfully"));
}); 

export { createPlaylist, addVideoToPlaylist };