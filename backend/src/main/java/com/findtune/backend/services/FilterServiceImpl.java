package com.findtune.backend.services;

import java.io.IOException;
import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * FilterServiceImpl is the implementation of the FilterService interface.
 * It provides methods to interact with the Spotify API to fetch available genres, markets, etc.
 */
@Service
public class FilterServiceImpl implements FilterService {

    private final HttpClient httpClient;
    private final ObjectMapper objectMapper;

    public FilterServiceImpl(HttpClient httpClient, ObjectMapper objectMapper) {
        this.httpClient = httpClient;
        this.objectMapper = objectMapper;
    }

    @Override
    public JsonNode getAvailableGenres(String accessToken) throws IOException, InterruptedException {
        String uri = "https://api.spotify.com/v1/recommendations/available-genre-seeds";
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(uri))
            .header("Authorization", "Bearer " + accessToken)
            .GET()
            .build();

        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

        if (response.statusCode() != 200) {
            throw new IOException("Failed to fetch available genres | HTTP status: " + response.statusCode() + " | Body: " + response.body());
        }

        return objectMapper.readTree(response.body());
    }

    @Override
    public JsonNode getAvailableMarkets(String accessToken) throws IOException, InterruptedException {
        String uri = "https://api.spotify.com/v1/markets";
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(uri))
            .header("Authorization", "Bearer " + accessToken)
            .GET()
            .build();

        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

        if (response.statusCode() != 200) {
            throw new IOException("Failed to fetch available markets | HTTP status: " + response.statusCode() + " | Body: " + response.body());
        }

        return objectMapper.readTree(response.body());
    }

    @Override
    public JsonNode searchArtists(String accessToken, String query) throws IOException, InterruptedException {

        // Encode the query string to handle spaces and special characters
        String encodedQuery = URLEncoder.encode(query, StandardCharsets.UTF_8);

        // Build the URL with the encoded query
        String uri = "https://api.spotify.com/v1/search?q=" + encodedQuery + "&type=artist";
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(uri))
            .header("Authorization", "Bearer " + accessToken)
            .GET()
            .build();

        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

        if (response.statusCode() != 200) {
            throw new IOException("Failed to search artists | HTTP status: " + response.statusCode() + " | Body: " + response.body());
        }

        return objectMapper.readTree(response.body());
    }

    @Override
    public JsonNode searchTracks(String accessToken, String query) throws IOException, InterruptedException {

        // Encode the query string to handle spaces and special characters
        String encodedQuery = URLEncoder.encode(query, StandardCharsets.UTF_8);

        String uri = "https://api.spotify.com/v1/search?q=" + encodedQuery + "&type=track";
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(uri))
            .header("Authorization", "Bearer " + accessToken)
            .GET()
            .build();

        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

        if (response.statusCode() != 200) {
            throw new IOException("Failed to search tracks | HTTP status: " + response.statusCode() + " | Body: " + response.body());
        }

        return objectMapper.readTree(response.body());
    }
}