package com.findtune.backend.services;

import java.io.IOException;

import org.apache.hc.core5.http.ParseException;

import se.michaelthelin.spotify.exceptions.SpotifyWebApiException;
import se.michaelthelin.spotify.model_objects.specification.User;

/**
 * UserProfileService interface that defines methods for handling Spotify user profiles.
 */
public interface UserProfileService {

    User getUserProfile(String accessToken) throws IOException, SpotifyWebApiException, ParseException;
}
