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
 * UserProfileServiceImpl class that implements the UserProfileService interface.
 * Provides methods to handle Spotify user profiles.
 */
@Service
public class UserProfileServiceImpl implements UserProfileService {

    private final HttpClient httpClient;
    private final ObjectMapper objectMapper;

    public UserProfileServiceImpl(HttpClient httpClient, ObjectMapper objectMapper) {
        this.httpClient = httpClient;
        this.objectMapper = objectMapper;
    }

    /**
     * Retrieves the current user's profile as a JsonNode.
     *
     * @param accessToken the access token for Spotify API.
     * @return a JsonNode containing the user's profile data.
     * @throws IOException if an I/O error occurs.
     * @throws InterruptedException if the request is interrupted.
     */
    @Override
    public JsonNode getUserProfile(String accessToken) throws IOException, InterruptedException {
        String uri = "https://api.spotify.com/v1/me";
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(uri))
            .header("Authorization", "Bearer " + accessToken)
            .GET()
            .build();

        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

        if (response.statusCode() != 200) {
            throw new IOException("Failed to retrieve user profile | HTTP status: " + response.statusCode() + " | Body: " + response.body());
        }

        return objectMapper.readTree(response.body());
    }
}