package com.findtune.backend.services;

import java.io.IOException;
import org.apache.hc.core5.http.ParseException;

import org.springframework.stereotype.Service;

import se.michaelthelin.spotify.SpotifyApi;
import se.michaelthelin.spotify.exceptions.SpotifyWebApiException;
import se.michaelthelin.spotify.model_objects.specification.User;
import se.michaelthelin.spotify.requests.data.users_profile.GetCurrentUsersProfileRequest;

/**
 * UserProfileServiceImpl class that implements the UserProfileService interface.
 * Provides methods to handle Spotify user profiles.
 */
@Service
public class UserProfileServiceImpl implements UserProfileService {
    
    private final SpotifyApi spotifyApi;

    /**
     * Constructs a UserProfileServiceImpl with the given SpotifyApi.
     *
     * @param spotifyApi the SpotifyApi instance.
     */
    public UserProfileServiceImpl(SpotifyApi spotifyApi) {
        this.spotifyApi = spotifyApi;
    }

    /**
     * Retrieves the current user's profile.
     *
     * @param accessToken the access token for Spotify API.
     * @return the user's profile.
     * @throws IOException if an I/O error occurs.
     * @throws SpotifyWebApiException if the Spotify API returns an error.
     * @throws ParseException if a parsing error occurs.
     */
    @Override
    public User getUserProfile(String accessToken) throws IOException, SpotifyWebApiException, ParseException {

        // Set the access token for Spotify API requests
        spotifyApi.setAccessToken(accessToken);

        // Build the request to get the current user's profile
        GetCurrentUsersProfileRequest getCurrentUsersProfileRequest = spotifyApi.getCurrentUsersProfile()
            .build();

        // Execute the request and return the user's profile
        return getCurrentUsersProfileRequest.execute();
    }
}
