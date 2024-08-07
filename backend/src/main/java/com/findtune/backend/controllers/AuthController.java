package com.findtune.backend.controllers;

import java.io.IOException;
import java.net.URI;
import org.apache.hc.core5.http.ParseException;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.findtune.backend.configs.Constants;
import com.findtune.backend.services.AuthService;

import jakarta.servlet.http.HttpServletResponse;

import se.michaelthelin.spotify.exceptions.SpotifyWebApiException;
import se.michaelthelin.spotify.model_objects.credentials.AuthorizationCodeCredentials;

/**
 * AuthController class that handles Spotify authentication requests.
 */
@RestController
@CrossOrigin(origins = "${frontend.api.url}")
@RequestMapping("/api/auth")
public class AuthController {
    
    @Autowired
    private AuthService authService;

    /**
     * Endpoint to get the Spotify login URI.
     *
     * @return the Spotify login URI as a string.
     */
    @GetMapping("/login")
    @ResponseBody
    public String login() {
        final URI uri = authService.getLoginUri();
        return uri.toString();
    } 

    /**
     * Callback endpoint to handle Spotify's authorization response.
     *
     * @param userCode the authorization code received from Spotify.
     * @param response the HttpServletResponse to redirect the user.
     * @throws IOException if an I/O error occurs.
     * @throws SpotifyWebApiException if the Spotify API returns an error.
     * @throws ParseException if a parsing error occurs.
     */
    @GetMapping("/callback")
    public void getSpotifyAccessToken(@RequestParam("code") String userCode, HttpServletResponse response) throws IOException, SpotifyWebApiException, ParseException {
        
        try {
            // Get the authorization code credentials
            AuthorizationCodeCredentials authorizationCodeCredentials = authService.getAuthorizationCodeCredentials(userCode);

            // Set the access and refresh tokens
            authService.setAccessToken(authorizationCodeCredentials);
            authService.setRefreshToken(authorizationCodeCredentials);

            // Redirect to frontend with the access token
            String redirectUrl = Constants.FRONTEND_API_URL + "/callback?accessToken=" + authorizationCodeCredentials.getAccessToken();
            response.sendRedirect(redirectUrl);

        } catch (IOException | SpotifyWebApiException | ParseException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
