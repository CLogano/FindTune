import CONSTANTS from "../../../constants"

// Helper method used to fetch the list of available genres the user can select for Spotify API
export const getAvailableGenres = async (accessToken, onUnauthorized) => {

    // Provide the access token in the header
    const headers = {
        Authorization: `Bearer ${accessToken}`
    };

    try {
        // Fetch available genres on backend
        const response = await fetch(CONSTANTS.apiURL + "/filters/genres", { headers });

        if (response.status === 401) {
            throw new Error("Unauthorized");
        }

        if (!response.ok) {
            throw new Error("Error fetching available genres");
        }

        const data = await response.json();

        // Capitalize the first letter of the genres
        const capitalizedGenres = capitalizeFirstLetter(data);

        return capitalizedGenres;

    } catch (error) {

        if (process.env.NODE_ENV !== "production") {
            console.error(error);
        }
        if (error.message === "Unauthorized") {
            onUnauthorized();
        }
        
    }
}

// Helper method used to fetch the list of available markets the user can select for Spotify API
export const getAvailableMarkets = async (accessToken, onUnauthorized) => {

    // Provide the access token in the header
    const headers = {
        Authorization: `Bearer ${accessToken}`
    };

    try {
        // Fetch available markets on backend
        const response = await fetch(CONSTANTS.apiURL + "/filters/markets", { headers });

        if (response.status === 401) {
            throw new Error("Unauthorized");
        }

        if (!response.ok) {
            throw new Error("Error fetching available markets");
        }
        const data = await response.json();
        const markets = data.markets;

        // Capitalize the first letter of the markets
        const capitalizedMarkets = capitalizeFirstLetter(markets);

        return capitalizedMarkets;

    } catch (error) {

        if (process.env.NODE_ENV !== "production") {
            console.error(error);
        }
        if (error.message === "Unauthorized") {
            onUnauthorized();
        }
    }
}

// Helper method used to search Spotify API for artists given a query
export const searchArtists = async (accessToken, onUnauthorized, query) => {

    // Provide the access token in the header
    const headers = {
        Authorization: `Bearer ${accessToken}`
    };

    try {

        // Construct the API URL with the query
        const url = `${CONSTANTS.apiURL}/filters/artists?query=${encodeURIComponent(query)}`;

        // Fetch available markets on backend
        const response = await fetch(url, { headers });

        if (response.status === 401) {
            throw new Error("Unauthorized");
        }

        if (!response.ok) {
            throw new Error("Error searching for artists");
        }
        const data = await response.json();

        return data.artists.items;

    } catch (error) {

        if (process.env.NODE_ENV !== "production") {
            console.error(error);
        }
        if (error.message === "Unauthorized") {
            onUnauthorized();
        }
    }
};

// Helper method used to search Spotify API for tracks given a query
export const searchTracks = async (accessToken, onUnauthorized, query) => {

    // Provide the access token in the header
    const headers = {
        Authorization: `Bearer ${accessToken}`
    };

    try {

        // Construct the API URL with the query
        const url = `${CONSTANTS.apiURL}/filters/tracks?query=${encodeURIComponent(query)}`;

        // Fetch available markets on backend
        const response = await fetch(url, { headers });

        if (response.status === 401) {
            throw new Error("Unauthorized");
        }

        if (!response.ok) {
            throw new Error("Error searching for tracks");
        }
        const data = await response.json();

        return data.tracks.items;

    } catch (error) {

        if (process.env.NODE_ENV !== "production") {
            console.error(error);
        }
        if (error.message === "Unauthorized") {
            onUnauthorized();
        }
    }
};

// Helper method used to capitalize the first letter of each element in an array
const capitalizeFirstLetter = (array) => {

    if (array && array.length > 0) {
        return array.map(item => {
            return item.charAt(0).toUpperCase() + item.slice(1);
        });
    } else {
        return array;
    }
};