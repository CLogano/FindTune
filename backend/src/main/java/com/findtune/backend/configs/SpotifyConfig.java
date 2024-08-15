// package com.findtune.backend.configs;

// import org.springframework.beans.factory.annotation.Qualifier;
// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;

// import se.michaelthelin.spotify.SpotifyApi;
// import se.michaelthelin.spotify.SpotifyHttpManager;

// /**
//  * SpotifyConfig class to configure Spotify API settings.
//  */
// @Configuration
// public class SpotifyConfig {

//     // Spotify client ID
//     @Value("${spotify.client.id}")
//     private String clientId;

//     // Spotify client secret
//     @Value("${spotify.client.secret}")
//     private String clientSecret;

//     // Spotify redirect URI
//     @Value("${spotify.redirect.uri}")
//     private String redirectUri;

//     // Spotify scopes
//     @Value("${spotify.scopes}")
//     @Qualifier("spotifyScopes")
//     private String scopes;

//     /**
//      * Configures the SpotifyApi bean.
//      *
//      * @return the configured SpotifyApi instance.
//      */
//     @Bean
//     SpotifyApi spotifyApi() {
//         return new SpotifyApi.Builder()
//             .setClientId(clientId)
//             .setClientSecret(clientSecret)
//             .setRedirectUri(SpotifyHttpManager.makeUri(redirectUri))
//             .build();
//     }

//     /**
//      * Configures the Spotify scopes bean.
//      *
//      * @return the configured Spotify scopes as a single string.
//      */
//     @Bean
//     String spotifyScopes() {
//         return String.join(" ", scopes.split(","));
//     }
// }