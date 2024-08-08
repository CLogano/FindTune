import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Callback component that handles the redirection after Spotify authentication.
 * @returns {JSX.Element} The rendered callback component.
 */
const Callback = () => {

    // Use React Router's hooks to access the current location and navigation functions
    const navigate = useNavigate();

    useEffect(() => {

        const params = new URLSearchParams(window.location.search);
        const accessToken = params.get("accessToken");

        if (accessToken) {
            localStorage.setItem("spotify_access_token", accessToken);
            navigate("/discover");
        } else {
            navigate("/login");
        }
    }, [navigate]);

    return (
        <div>
            Logging in...
        </div>
    );
};

export default Callback;