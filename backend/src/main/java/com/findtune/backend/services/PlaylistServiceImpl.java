package com.findtune.backend.services;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.apache.hc.core5.http.ParseException;
import org.springframework.stereotype.Service;

import se.michaelthelin.spotify.SpotifyApi;
import se.michaelthelin.spotify.exceptions.SpotifyWebApiException;
import se.michaelthelin.spotify.model_objects.specification.Paging;
import se.michaelthelin.spotify.model_objects.specification.Playlist;
import se.michaelthelin.spotify.model_objects.specification.PlaylistSimplified;
import se.michaelthelin.spotify.requests.data.follow.legacy.UnfollowPlaylistRequest;
import se.michaelthelin.spotify.requests.data.playlists.ChangePlaylistsDetailsRequest;
import se.michaelthelin.spotify.requests.data.playlists.CreatePlaylistRequest;
import se.michaelthelin.spotify.requests.data.playlists.GetListOfUsersPlaylistsRequest;
import se.michaelthelin.spotify.requests.data.playlists.GetPlaylistRequest;
import se.michaelthelin.spotify.requests.data.playlists.UploadCustomPlaylistCoverImageRequest;

/**
 * PlaylistServiceImpl class that implements the PlaylistService interface.
 * Provides methods to handle Spotify playlists.
 */
@Service
public class PlaylistServiceImpl implements PlaylistService {
    
    private final SpotifyApi spotifyApi;

    /**
     * Constructs a PlaylistServiceImpl with the given SpotifyApi.
     *
     * @param spotifyApi the SpotifyApi instance.
     */
    public PlaylistServiceImpl(SpotifyApi spotifyApi) {
        this.spotifyApi = spotifyApi;
    }

    /**
     * Retrieves the list of user's playlists.
     *
     * @param accessToken the access token for Spotify API.
     * @param userId the user's Spotify ID.
     * @return the list of playlists.
     * @throws IOException if an I/O error occurs.
     * @throws SpotifyWebApiException if the Spotify API returns an error.
     * @throws ParseException if a parsing error occurs.
     */
    @Override
    public List<Playlist> getUserPlaylists(String accessToken, String userId) throws IOException, SpotifyWebApiException, ParseException {

        // Set the access token for Spotify API requests
        spotifyApi.setAccessToken(accessToken);

        // Build the request to get the user's playlists
        GetListOfUsersPlaylistsRequest getListOfUsersPlaylistsRequest = spotifyApi.getListOfUsersPlaylists(userId)
                .build();

        // Execute the request and get the response
        Paging<PlaylistSimplified> playlistSimplifiedPaging = getListOfUsersPlaylistsRequest.execute();

        // Get the simplified playlists from the response
        PlaylistSimplified[] playlistSimplifiedArray = playlistSimplifiedPaging.getItems();

        // Convert simplified playlists to detailed playlists
        List<Playlist> detailedPlaylists = new ArrayList<>();
        for (PlaylistSimplified simplified : playlistSimplifiedArray) {
            // Build and execute a request to get detailed playlist information (such as playlist description, etc.)
            GetPlaylistRequest getPlaylistRequest = spotifyApi.getPlaylist(simplified.getId())
                .build();
            Playlist detailedPlaylist = getPlaylistRequest.execute();
            detailedPlaylists.add(detailedPlaylist);
        }

        return detailedPlaylists;
    }

    /**
     * Creates a new playlist for the user.
     *
     * @param accessToken the access token for Spotify API.
     * @param userId the user's Spotify ID.
     * @param name the name of the playlist.
     * @param description the description of the playlist.
     * @return the created playlist.
     * @throws IOException if an I/O error occurs.
     * @throws SpotifyWebApiException if the Spotify API returns an error.
     * @throws ParseException if a parsing error occurs.
     */
    @Override
    public Playlist createUserPlaylist(String accessToken, String userId, String name, String description) throws IOException, SpotifyWebApiException, ParseException {

        // Set the access token for Spotify API requests
        spotifyApi.setAccessToken(accessToken);

        // Build the request to create a new playlist
        CreatePlaylistRequest createPlaylistRequest = spotifyApi.createPlaylist(userId, name)
            .description(description)
            .build();

        // Execute the request and return the created playlist
        return createPlaylistRequest.execute();
    }

    /**
     * Edits an existing playlist.
     *
     * @param accessToken the access token for Spotify API.
     * @param playlistId the ID of the playlist to be edited.
     * @param name the new name of the playlist.
     * @param description the new description of the playlist.
     * @return the edited playlist.
     * @throws IOException if an I/O error occurs.
     * @throws SpotifyWebApiException if the Spotify API returns an error.
     * @throws ParseException if a parsing error occurs.
     */
    @Override
    public Playlist editUserPlaylist(String accessToken, String playlistId, String name, String description) throws IOException, SpotifyWebApiException, ParseException {

        // Set the access token for Spotify API requests
        spotifyApi.setAccessToken(accessToken);

        // Build the request to edit the playlist details
        ChangePlaylistsDetailsRequest changePlaylistsDetailsRequest = spotifyApi.changePlaylistsDetails(playlistId)
            .name(name)
            .description(description)
            .build();

        // Execute the request to change playlist details
        changePlaylistsDetailsRequest.execute();
        
        // Return the updated playlist
        return spotifyApi.getPlaylist(playlistId).build().execute();
    }

    /**
     * Deletes a user's playlist.
     *
     * @param accessToken the access token for Spotify API.
     * @param userId the user's Spotify ID.
     * @param playlistId the ID of the playlist to be deleted.
     * @throws IOException if an I/O error occurs.
     * @throws SpotifyWebApiException if the Spotify API returns an error.
     * @throws ParseException if a parsing error occurs.
     */
    @Override
    public void deleteUserPlaylist(String accessToken, String userId, String playlistId) throws IOException, SpotifyWebApiException, ParseException {

        // Set the access token for Spotify API requests
        spotifyApi.setAccessToken(accessToken);

        // Build the request to unfollow (delete) the playlist
        UnfollowPlaylistRequest unfollowPlaylistRequest = spotifyApi.unfollowPlaylist(userId, playlistId)
            .build();

        // Execute the request to unfollow the playlist
        unfollowPlaylistRequest.execute();
    }

    /**
     * Uploads a custom image for a user's playlist.
     *
     * @param accessToken the access token for Spotify API.
     * @param playlistId the ID of the playlist.
     * @param base64Image the image data in Base64 format.
     * @throws IOException if an I/O error occurs.
     * @throws SpotifyWebApiException if the Spotify API returns an error.
     * @throws ParseException if a parsing error occurs.
     */
    @Override
    public void uploadUserPlaylistImage(String accessToken, String playlistId, String base64Image) throws IOException, SpotifyWebApiException, ParseException {

        // Set the access token for Spotify API requests
        spotifyApi.setAccessToken(accessToken);

        // Build the request to upload a custom playlist cover image
        UploadCustomPlaylistCoverImageRequest uploadCustomPlaylistCoverImageRequest = spotifyApi.uploadCustomPlaylistCoverImage(playlistId)
            .image_data(base64Image)
            .build();

        // Execute the request to upload the image
        uploadCustomPlaylistCoverImageRequest.execute();
    }
}
