package com.findtune.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.findtune.backend.services.UserProfileService;

import se.michaelthelin.spotify.exceptions.SpotifyWebApiException;
import se.michaelthelin.spotify.model_objects.specification.User;

import java.io.IOException;
import org.apache.hc.core5.http.ParseException;

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
     * @return the current user's profile.
     * @throws IOException if an I/O error occurs.
     * @throws SpotifyWebApiException if the Spotify API returns an error.
     * @throws ParseException if a parsing error occurs.
     */
    @GetMapping("/profile")
    public User getCurrentUserProfile(@RequestHeader("Authorization") String authorization) throws IOException, SpotifyWebApiException, ParseException {

        try {
            // Extract access token from Authorization header
            String accessToken = authorization.substring("Bearer ".length());

            return userProfileService.getUserProfile(accessToken);
            
        } catch (IOException | SpotifyWebApiException | ParseException e) {
            System.out.println("Error: " + e.getMessage());
        }
        
        return null;
    }
}
