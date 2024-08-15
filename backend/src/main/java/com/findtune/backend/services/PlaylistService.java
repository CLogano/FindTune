package com.findtune.backend.services;

import java.io.IOException;

import com.fasterxml.jackson.databind.JsonNode;

/**
 * PlaylistService interface that defines methods for handling Spotify playlists.
 */
public interface PlaylistService {

    JsonNode getUserPlaylists(String accessToken, String userId) throws IOException, InterruptedException;

    JsonNode createUserPlaylist(String accessToken, String userId, String name, String description) throws IOException, InterruptedException;

    JsonNode editUserPlaylist(String accessToken, String playlistId, String name, String description) throws IOException, InterruptedException;

    void deleteUserPlaylist(String accessToken, String userId, String playlistId) throws IOException, InterruptedException;

    void uploadUserPlaylistImage(String accessToken, String playlistId, String base64Image) throws IOException, InterruptedException;
}