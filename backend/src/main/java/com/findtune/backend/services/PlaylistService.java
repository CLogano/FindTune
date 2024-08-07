package com.findtune.backend.services;

import java.io.IOException;
import java.util.List;

import org.apache.hc.core5.http.ParseException;

import se.michaelthelin.spotify.exceptions.SpotifyWebApiException;
import se.michaelthelin.spotify.model_objects.specification.Playlist;

/**
 * PlaylistService interface that defines methods for handling Spotify playlists.
 */
public interface PlaylistService {

    List<Playlist> getUserPlaylists(String accessToken, String userId) throws IOException, SpotifyWebApiException, ParseException;

    Playlist createUserPlaylist(String accessToken, String userId, String name, String description) throws IOException, SpotifyWebApiException, ParseException;

    Playlist editUserPlaylist(String accessToken, String playlistId, String name, String description) throws IOException, SpotifyWebApiException, ParseException;

    void deleteUserPlaylist(String accessToken, String userId, String playlistId) throws IOException, SpotifyWebApiException, ParseException;

    void uploadUserPlaylistImage(String accessToken, String playlistId, String base64Image) throws IOException, SpotifyWebApiException, ParseException;
}
