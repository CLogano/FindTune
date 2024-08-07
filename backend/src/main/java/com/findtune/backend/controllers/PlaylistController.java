package com.findtune.backend.controllers;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.apache.hc.core5.http.ParseException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.findtune.backend.services.PlaylistService;

import se.michaelthelin.spotify.exceptions.SpotifyWebApiException;
import se.michaelthelin.spotify.model_objects.specification.Playlist;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

/**
 * PlaylistController class that handles playlist-related requests.
 */
@RestController
@CrossOrigin(origins = "${frontend.api.url}")
@RequestMapping("/api/playlists")
public class PlaylistController {
    
    @Autowired
    private PlaylistService playlistService;

    /**
     * Endpoint to get a user's playlists.
     *
     * @param authorization the access token for Spotify API.
     * @param userId the user's Spotify ID.
     * @return a list of the user's playlists.
     * @throws IOException if an I/O error occurs.
     * @throws SpotifyWebApiException if the Spotify API returns an error.
     * @throws ParseException if a parsing error occurs.
     */
    @GetMapping
    public List<Playlist> getUserPlaylists(@RequestHeader("Authorization") String authorization, @RequestParam("userId") String userId) throws IOException, SpotifyWebApiException, ParseException {

        try {
            // Extract access token from Authorization header
            String accessToken = authorization.substring("Bearer ".length());
            return playlistService.getUserPlaylists(accessToken, userId);

        } catch (IOException | SpotifyWebApiException | ParseException e) {
            System.out.println("Error: " + e.getMessage());
        }
        
        return null;
    }

    /**
     * Endpoint to create a new playlist.
     *
     * @param authorization the access token for Spotify API.
     * @param payload a map containing playlist details (userId, name, description, image).
     * @return the created playlist.
     * @throws IOException if an I/O error occurs.
     * @throws SpotifyWebApiException if the Spotify API returns an error.
     * @throws ParseException if a parsing error occurs.
     */
    @PostMapping("/create")
    public Playlist createUserPlaylist(@RequestHeader("Authorization") String authorization,
        @RequestBody Map<String, String> payload) throws IOException, SpotifyWebApiException, ParseException {

        // Extract playlist details from payload
        String userId = payload.get("userId");
        String name = payload.get("name");
        String description = payload.get("description");
        String base64Image = payload.get("image");

        try {
            // Extract access token from Authorization header
            String accessToken = authorization.substring("Bearer ".length());

            if (description == null) {
                description = "";
            }

            // Create a new playlist
            Playlist playlist = playlistService.createUserPlaylist(accessToken, userId, name, description);

            // Upload cover image to playlist if provided
            if (base64Image != null && !base64Image.isEmpty()) {
                playlistService.uploadUserPlaylistImage(accessToken, playlist.getId(), base64Image);
            }

            return playlist;

        } catch (IOException | SpotifyWebApiException | ParseException e) {
            System.out.println("Error: " + e.getMessage());
        }

        return null;
    }

    /**
     * Endpoint to edit an existing playlist.
     *
     * @param authorization the access token for Spotify API.
     * @param payload a map containing updated playlist details (playlistId, name, description, image).
     * @return the updated playlist.
     * @throws IOException if an I/O error occurs.
     * @throws SpotifyWebApiException if the Spotify API returns an error.
     * @throws ParseException if a parsing error occurs.
     */
    @PutMapping("/edit")
    public Playlist editUserPlaylist(@RequestHeader("Authorization") String authorization,
        @RequestBody Map<String, String> payload) throws IOException, SpotifyWebApiException, ParseException {

        // Extract playlist details from payload
        String playlistId = payload.get("playlistId");
        String name = payload.get("name");
        String description = payload.get("description");
        String base64Image = payload.get("image");

        try {
            // Extract access token from Authorization header
            String accessToken = authorization.substring("Bearer ".length());

            if (description == null) {
                description = "";
            }

            // Edit the playlist details
            Playlist playlist = playlistService.editUserPlaylist(accessToken, playlistId, name, description);

            // Upload cover image to playlist if provided
            if (base64Image != null && !base64Image.isEmpty()) {
                playlistService.uploadUserPlaylistImage(accessToken, playlistId, base64Image);
            }

            return playlist;

        } catch (IOException | SpotifyWebApiException | ParseException e) {
            System.out.println("Error: " + e.getMessage());
        }

        return null;
    }

    @DeleteMapping("/delete")
    public void deleteUserPlaylist(@RequestHeader("Authorization") String authorization,
        @RequestBody Map<String, String> payload) throws IOException, SpotifyWebApiException, ParseException {

        // Extract userId and playlistId from payload
        String userId = payload.get("userId");
        String playlistId = payload.get("playlistId");

        try {
            // Extract access token from Authorization header
            String accessToken = authorization.substring("Bearer ".length());
            
            // Delete the playlist
            playlistService.deleteUserPlaylist(accessToken, userId, playlistId);

        } catch (IOException | SpotifyWebApiException | ParseException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
