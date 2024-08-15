package com.findtune.backend.configs;

import java.net.http.HttpClient;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.fasterxml.jackson.databind.ObjectMapper;

import se.michaelthelin.spotify.SpotifyApi;
import se.michaelthelin.spotify.SpotifyHttpManager;

@Configuration
public class AppConfig {
    
    @Value("${spotify.client.id}")
    private String clientId;

    @Value("${spotify.client.secret}")
    private String clientSecret;

    @Value("${spotify.redirect.uri}")
    private String redirectUri;

    @Value("${spotify.scopes}")
    private String scopes;

    @Bean
    HttpClient httpClient() {
        return HttpClient.newHttpClient();
    }

    @Bean
    ObjectMapper objectMapper() {
        return new ObjectMapper();
    }

    @Bean
    String spotifyScopes() {
        return String.join(" ", scopes.split(","));
    }

    /**
     * Configures the SpotifyApi bean.
     *
     * @return the configured SpotifyApi instance.
     */
    @Bean
    SpotifyApi spotifyApi() {
        return new SpotifyApi.Builder()
            .setClientId(clientId)
            .setClientSecret(clientSecret)
            .setRedirectUri(SpotifyHttpManager.makeUri(redirectUri))
            .build();
    }
}
