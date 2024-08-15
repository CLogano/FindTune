package com.findtune.backend.services;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * PlaylistServiceImpl class that implements the PlaylistService interface.
 * Provides methods to handle Spotify playlists.
 */
@Service
public class PlaylistServiceImpl implements PlaylistService {

    private final HttpClient httpClient;
    private final ObjectMapper objectMapper;

    public PlaylistServiceImpl(HttpClient httpClient, ObjectMapper objectMapper) {
        this.httpClient = httpClient;
        this.objectMapper = objectMapper;
    }

    @Override
    public JsonNode getUserPlaylists(String accessToken, String userId) throws IOException, InterruptedException {
        String uri = "https://api.spotify.com/v1/users/" + userId + "/playlists";
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(uri))
            .header("Authorization", "Bearer " + accessToken)
            .GET()
            .build();

        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

        if (response.statusCode() != 200) {
            throw new IOException("Failed to retrieve user playlists | HTTP status: " + response.statusCode() + " | Body: " + response.body());
        }

        return objectMapper.readTree(response.body());
    }

    @Override
    public JsonNode createUserPlaylist(String accessToken, String userId, String name, String description) throws IOException, InterruptedException {
        String uri = "https://api.spotify.com/v1/users/" + userId + "/playlists";
        String jsonPayload = String.format("{\"name\":\"%s\",\"description\":\"%s\",\"public\":false}", name, description);
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(uri))
            .header("Authorization", "Bearer " + accessToken)
            .header("Content-Type", "application/json")
            .POST(HttpRequest.BodyPublishers.ofString(jsonPayload))
            .build();

        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

        if (response.statusCode() != 201) {
            throw new IOException("Failed to create user playlist | HTTP status: " + response.statusCode() + " | Body: " + response.body());
        }

        return objectMapper.readTree(response.body());
    }

    @Override
    public JsonNode editUserPlaylist(String accessToken, String playlistId, String name, String description) throws IOException, InterruptedException {
        String uri = "https://api.spotify.com/v1/playlists/" + playlistId;
        String jsonPayload = String.format("{\"name\":\"%s\",\"description\":\"%s\",\"public\":false}", name, description);
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(uri))
            .header("Authorization", "Bearer " + accessToken)
            .header("Content-Type", "application/json")
            .PUT(HttpRequest.BodyPublishers.ofString(jsonPayload))
            .build();

        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

        if (response.statusCode() != 200) {
            throw new IOException("Failed to edit user playlist | HTTP status: " + response.statusCode() + " | Body: "
                    + response.body());
        }

        // Fetch the updated playlist data to return it
        String fetchUri = "https://api.spotify.com/v1/playlists/" + playlistId;
        HttpRequest fetchRequest = HttpRequest.newBuilder()
                .uri(URI.create(fetchUri))
                .header("Authorization", "Bearer " + accessToken)
                .GET()
                .build();

        HttpResponse<String> fetchResponse = httpClient.send(fetchRequest, HttpResponse.BodyHandlers.ofString());

        if (fetchResponse.statusCode() != 200) {
            throw new IOException("Failed to fetch updated playlist | HTTP status: " + fetchResponse.statusCode()
                    + " | Body: " + fetchResponse.body());
        }

        return objectMapper.readTree(fetchResponse.body());
    }

    @Override
    public void deleteUserPlaylist(String accessToken, String userId, String playlistId) throws IOException, InterruptedException {
        String uri = "https://api.spotify.com/v1/users/" + userId + "/playlists/" + playlistId + "/followers";
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(uri))
            .header("Authorization", "Bearer " + accessToken)
            .DELETE()
            .build();

        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

        if (response.statusCode() != 200) {
            throw new IOException("Failed to delete user playlist | HTTP status: " + response.statusCode() + " | Body: " + response.body());
        }
    }

    @Override
    public void uploadUserPlaylistImage(String accessToken, String playlistId, String base64Image) throws IOException, InterruptedException {
        String uri = "https://api.spotify.com/v1/playlists/" + playlistId + "/images";
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(uri))
            .header("Authorization", "Bearer " + accessToken)
            .header("Content-Type", "image/jpeg")
            .PUT(HttpRequest.BodyPublishers.ofString(base64Image))
            .build();

        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

        if (response.statusCode() != 202) {
            throw new IOException("Failed to upload playlist image | HTTP status: " + response.statusCode() + " | Body: " + response.body());
        }
    }
}