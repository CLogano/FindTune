package com.findtune.backend.controllers;

import java.io.IOException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;
import com.findtune.backend.services.PlaylistService;

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

    @GetMapping
    public JsonNode getUserPlaylists(@RequestHeader("Authorization") String authorization,
        @RequestParam("userId") String userId) throws IOException, InterruptedException {
        try {
            String accessToken = authorization.substring("Bearer ".length());
            return playlistService.getUserPlaylists(accessToken, userId);
        } catch (IOException | InterruptedException e) {
            System.out.println("Method: getUserPlaylists | Error: " + e.getMessage());
            throw e;
        }
    }

    @PostMapping("/create")
    public JsonNode createUserPlaylist(@RequestHeader("Authorization") String authorization,
        @RequestBody Map<String, String> payload) throws IOException, InterruptedException {
        String userId = payload.get("userId");
        String name = payload.get("name");
        String description = payload.get("description");
        String base64Image = payload.get("image");

        try {
            String accessToken = authorization.substring("Bearer ".length());
            if (description == null) {
                description = "";
            }

            JsonNode playlist = playlistService.createUserPlaylist(accessToken, userId, name, description);

            if (base64Image != null && !base64Image.isEmpty()) {
                playlistService.uploadUserPlaylistImage(accessToken, playlist.get("id").asText(), base64Image);
            }

            return playlist;

        } catch (IOException | InterruptedException e) {
            System.out.println("Method: createUserPlaylist | Error: " + e.getMessage());
            throw e;
        }
    }

    @PutMapping("/edit")
    public JsonNode editUserPlaylist(@RequestHeader("Authorization") String authorization,
        @RequestBody Map<String, String> payload) throws IOException, InterruptedException {
        String playlistId = payload.get("playlistId");
        String name = payload.get("name");
        String description = payload.get("description");
        String base64Image = payload.get("image");

        try {
            String accessToken = authorization.substring("Bearer ".length());
            if (description == null) {
                description = "";
            }

            JsonNode playlist = playlistService.editUserPlaylist(accessToken, playlistId, name, description);

            if (base64Image != null && !base64Image.isEmpty()) {
                playlistService.uploadUserPlaylistImage(accessToken, playlistId, base64Image);
            }

            return playlist;

        } catch (IOException | InterruptedException e) {
            System.out.println("Method: editUserPlaylist | Error: " + e.getMessage());
            throw e;
        }
    }

    @DeleteMapping("/delete")
    public void deleteUserPlaylist(@RequestHeader("Authorization") String authorization,
        @RequestBody Map<String, String> payload) throws IOException, InterruptedException {
        String userId = payload.get("userId");
        String playlistId = payload.get("playlistId");

        try {
            String accessToken = authorization.substring("Bearer ".length());
            playlistService.deleteUserPlaylist(accessToken, userId, playlistId);
        } catch (IOException | InterruptedException e) {
            System.out.println("Method: deleteUserPlaylist | Error: " + e.getMessage());
            throw e;
        }
    }
}