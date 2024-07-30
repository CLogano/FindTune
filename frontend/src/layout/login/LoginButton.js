import React from "react";
import classes from "./LoginButton.module.css";
import icon from "../../pictures/spotify-icon-white.png";
import CONSTANTS from "../../constants";

/**
 * Button component to initiate Spotify login.
 * @returns {JSX.Element} The rendered login button.
 */
const LoginButton = () => {

    // Spotify authorization parameters
    const redirectUri = CONSTANTS.frontendURL + "/callback";
    const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    const scopes = CONSTANTS.spotifyScopes;

    // Function to handle login by redirecting to Spotify's authorization page
    const handleLogin = () => {
        const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}`;
        window.location.href = authUrl;
    };

    return (
        <button className={classes.container} onClick={handleLogin}>
            <img className={classes.icon} src={icon} alt="Spotify icon" />
            <div className={classes.text}>Login with Spotify</div>
        </button>
    );
};

export default LoginButton;