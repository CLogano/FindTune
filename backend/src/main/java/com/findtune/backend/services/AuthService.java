package com.findtune.backend.services;

import java.io.IOException;
import java.net.URI;

import org.apache.hc.core5.http.ParseException;

import se.michaelthelin.spotify.exceptions.SpotifyWebApiException;
import se.michaelthelin.spotify.model_objects.credentials.AuthorizationCodeCredentials;

/**
 * AuthService interface that defines the methods for handling Spotify authorization.
 */
public interface AuthService {
    
    public URI getLoginUri();

    AuthorizationCodeCredentials getAuthorizationCodeCredentials(String code) throws IOException, SpotifyWebApiException, ParseException;

    public void setAccessToken(AuthorizationCodeCredentials authorizationCodeCredentials);

    public void setRefreshToken(AuthorizationCodeCredentials authorizationCodeCredentials);
}
