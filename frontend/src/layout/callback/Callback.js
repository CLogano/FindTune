import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * Callback component that handles the redirection after Spotify authentication.
 * @returns {JSX.Element} The rendered callback component.
 */
const Callback = () => {

    // Use React Router's hooks to access the current location and navigation functions
    const location = useLocation();
    const navigate = useNavigate();

    // Display a message to the user based on if the user is granted access
    const [message, setMessage] = useState("Logging in...");

    useEffect(() => {
        // Get the hash portion of the URL (containing the access token)
        const hash = location.hash;

        // Replace the leading '#' with an empty string and create URLSearchParams object
        const params = new URLSearchParams(hash.replace('#', ''));

        // Extract the access token from the URL parameters
        const accessToken = params.get("access_token");

        if (accessToken) {
            // Store the access token in local storage for future API requests
            localStorage.setItem("spotify_access_token", accessToken);

            // Navigate to the Discover page after storing the access token
            navigate("/discover");
        } else {
            setMessage("No access token found. Unable to log in.");
        }
    }, [location, navigate]);

    return (
        <div>
            {message}
        </div>
    );
};

export default Callback;