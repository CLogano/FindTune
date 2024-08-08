package com.findtune.backend.services;

import java.io.IOException;
import java.net.URI;

import org.apache.hc.core5.http.ParseException;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import se.michaelthelin.spotify.SpotifyApi;
import se.michaelthelin.spotify.exceptions.SpotifyWebApiException;
import se.michaelthelin.spotify.model_objects.credentials.AuthorizationCodeCredentials;
import se.michaelthelin.spotify.requests.authorization.authorization_code.AuthorizationCodeRequest;
import se.michaelthelin.spotify.requests.authorization.authorization_code.AuthorizationCodeUriRequest;

/**
 * AuthServiceImpl class that implements the AuthService interface.
 * Provides methods to handle Spotify authorization process.
 */
@Service
public class AuthServiceImpl implements AuthService {

    private final SpotifyApi spotifyApi;
    private final String spotifyScopes;

    /**
     * Constructs an AuthServiceImpl with the given SpotifyApi and scopes.
     *
     * @param spotifyApi the SpotifyApi instance.
     * @param spotifyScopes the scopes for Spotify authorization.
     */
    public AuthServiceImpl(SpotifyApi spotifyApi, @Qualifier("spotifyScopes") String spotifyScopes) {
        this.spotifyApi = spotifyApi;
        this.spotifyScopes = spotifyScopes;
    }
    
    /**
     * Generates and returns the URI for the Spotify login.
     *
     * @return the URI for Spotify login.
     */
    @Override
    public URI getLoginUri() {

        // Build the authorization code URI request with the specified scopes and dialog options
        AuthorizationCodeUriRequest authorizationCodeUriRequest = spotifyApi.authorizationCodeUri()
            .scope(spotifyScopes)
            .show_dialog(true)
            .build();

        // Execute the request and return the login URI
        return authorizationCodeUriRequest.execute();
    }

    /**
     * Retrieves the AuthorizationCodeCredentials using the provided authorization code.
     *
     * @param code the authorization code provided by Spotify.
     * @return the AuthorizationCodeCredentials.
     * @throws IOException if an I/O error occurs.
     * @throws SpotifyWebApiException if the Spotify API returns an error.
     * @throws ParseException if a parsing error occurs.
     */
    @Override
    public AuthorizationCodeCredentials getAuthorizationCodeCredentials(String code) throws IOException, SpotifyWebApiException, ParseException {

        // Build the authorization code request with the provided code
        AuthorizationCodeRequest authorizationCodeRequest = spotifyApi.authorizationCode(code)
            .build();

        // Execute the request and return the authorization code credentials
        final AuthorizationCodeCredentials authorizationCodeCredentials = authorizationCodeRequest.execute();
            
        return authorizationCodeCredentials;
    }

    /**
     * Sets the access token in the Spotify API client.
     *
     * @param authorizationCodeCredentials the credentials containing the access token.
     */
    @Override
    public void setAccessToken(AuthorizationCodeCredentials authorizationCodeCredentials) {
        spotifyApi.setAccessToken(authorizationCodeCredentials.getAccessToken());
    }

    /**
     * Sets the refresh token in the Spotify API client.
     *
     * @param authorizationCodeCredentials the credentials containing the refresh token.
     */
    @Override
    public void setRefreshToken(AuthorizationCodeCredentials authorizationCodeCredentials) {
        spotifyApi.setRefreshToken(authorizationCodeCredentials.getRefreshToken());
    }
}
