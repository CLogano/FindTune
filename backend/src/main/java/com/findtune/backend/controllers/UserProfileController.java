package com.findtune.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;
import com.findtune.backend.services.UserProfileService;

import java.io.IOException;

/**
 * UserProfileController class that handles user profile-related requests.
 */
@RestController
@CrossOrigin(origins = "${frontend.api.url}")
@RequestMapping("/api/user")
public class UserProfileController {

    @Autowired
    private UserProfileService userProfileService;

    /**
     * Endpoint to get the current user's profile.
     *
     * @param authorization the access token for Spotify API.
     * @return a JsonNode containing the user's profile data.
     * @throws IOException if an I/O error occurs.
     * @throws InterruptedException if the request is interrupted.
     */
    @GetMapping("/profile")
    public JsonNode getCurrentUserProfile(@RequestHeader("Authorization") String authorization) throws IOException, InterruptedException {
        try {
            String accessToken = authorization.substring("Bearer ".length());
            return userProfileService.getUserProfile(accessToken);
        } catch (IOException | InterruptedException e) {
            System.out.println("Method: getCurrentUserProfile | Error: " + e.getMessage());
            throw e;
        }
    }
}