package com.findtune.backend.services;

import java.io.IOException;

import com.fasterxml.jackson.databind.JsonNode;

/**
 * UserProfileService interface that defines methods for handling Spotify user profiles.
 */
public interface UserProfileService {
    JsonNode getUserProfile(String accessToken) throws IOException, InterruptedException;
}
