package com.findtune.backend.services;

import java.io.IOException;

import com.fasterxml.jackson.databind.JsonNode;

/**
 * FilterService interface that defines the methods for handling various filters offered from Spotify in relation to their Recommendation API.
 */
public interface FilterService {
    
    JsonNode getAvailableGenres(String accessToken) throws IOException, InterruptedException;

    JsonNode getAvailableMarkets(String accessToken) throws IOException, InterruptedException;

    JsonNode searchArtists(String accessToken, String query) throws IOException, InterruptedException;

    JsonNode searchTracks(String accessToken, String query) throws IOException, InterruptedException;
}