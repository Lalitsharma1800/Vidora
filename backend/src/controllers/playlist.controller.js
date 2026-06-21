import {Playlist} from '../model/playlist.model.js';
import {ApiError} from '../utils/ApiError.js';
import {ApiResponse} from '../utils/ApiResponse.js';
import {asyncHandler} from '../utils/asyncHandler.js';

const createPlaylist = asyncHandler(async (req, res) => {
    const {name, description} = req.body;
    const userId = req.user._id;
    const playlist = await Playlist.create({name, description, user: userId});
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

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params;
    const {videoId} = req.body;
    const playlist = await PlayList.findById(playlistId);
    if(!playlist) {
        throw new ApiError(400, "Playlist not found");
    }
    if(!playlist.videos.includes(videoId)) {
        throw new ApiError(400, "Video not in playlist");
    }
    playlist.videos.pull(videoId);
    await playlist.save();
    return res.status(200).json(new ApiResponse(200, playlist, "Video removed from playlist successfully"));
});

const deletePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params;
    const playlist = await PlayList.findById(playlistId);   
    if(!playlist) {
        throw new ApiError(400, "Playlist not found");
    }
    await playlist.deleteOne();
    return res.status(200).json(new ApiResponse(200, null, "Playlist deleted successfully"));
});

const getUserPlaylists = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const playlists = await PlayList.find({user: userId}).populate("videos");
    return res.status(200).json(new ApiResponse(200, playlists, "User playlists retrieved successfully"));
});

const getPlaylistById = asyncHandler(async (req, res) => {
    const {playlistId} = req.params;
    const playlist = await PlayList.findById(playlistId).populate("videos");    
    if(!playlist) {
        throw new ApiError(400, "Playlist not found");
    }
    return res.status(200).json(new ApiResponse(200, playlist, "Playlist retrieved successfully"));
});

const updatePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params;
    const {name, description} = req.body;
    const playlist = await PlayList.findById(playlistId);
    if(!playlist) {
        throw new ApiError(400, "Playlist not found");
    }
    playlist.name = name;
    playlist.description = description;
    await playlist.save();
    return res.status(200).json(new ApiResponse(200, playlist, "Playlist updated successfully"));
});

export {createPlaylist, addVideoToPlaylist, removeVideoFromPlaylist, deletePlaylist, getUserPlaylists, getPlaylistById, updatePlaylist};