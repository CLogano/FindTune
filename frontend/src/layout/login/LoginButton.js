import React from "react";
import classes from "./LoginButton.module.css";
import icon from "../../pictures/spotify-icon-white.png";
import { getLogin } from "./helpers/loginHelper";

/**
 * Button component to initiate Spotify login.
 * @returns {JSX.Element} The rendered login button.
 */
const LoginButton = () => {

    // const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    // const scopes = CONSTANTS.spotifyScopes;

    // Handle login by redirecting to Spotify's authorization page
    const loginHandler = async () => {
        await getLogin();
    };

    return (
        <button className={classes.container} onClick={loginHandler}>
            <img className={classes.icon} src={icon} alt="Spotify icon" />
            <div className={classes.text}>Login with Spotify</div>
        </button>
    );
};

export default LoginButton;