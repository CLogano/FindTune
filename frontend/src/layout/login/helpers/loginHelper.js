import CONSTANTS from "../../../constants";

// Helper function to handle login by redirecting to Spotify's authorization page
export const getLogin = async () => {
    try {
        const response = await fetch(CONSTANTS.apiURL + "/auth/login");
        const redirectUrl = await response.text();
        window.location.replace(redirectUrl);
    } catch (error) {
        if (process.env.NODE_ENV !== "production") {
            console.error(error);
        }
    }
}