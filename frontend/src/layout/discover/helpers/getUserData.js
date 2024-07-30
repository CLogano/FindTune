
// Helper method used to fetch the user's profile data from Spotify
export const getProfile = async (accessToken) => {

    const headers = {
        Authorization: `Bearer ${accessToken}`
    };

    try {
        // Fetch user's profile data
        const userResponse = await fetch("https://api.spotify.com/v1/me", { headers });
        if (!userResponse.ok) {
            throw new Error("Error fetching user data");
        }
        const userData = await userResponse.json();

        return userData;

    } catch (error) {
        if (process.env.NODE_ENV !== "production") {
            console.error(error);
        }
    }
};

// Helper method used to fetch the user's playlists from Spotify
export const getPlaylists = async (accessToken) => {

    const headers = {
      Authorization: `Bearer ${accessToken}`
    };
  
    try {
      // Fetch user's playlists
      const playlistsResponse = await fetch("https://api.spotify.com/v1/me/playlists", { headers });
      if (!playlistsResponse.ok) {
        throw new Error("Error fetching user playlists");
      }
      const playlistsData = await playlistsResponse.json();
  
      return playlistsData.items;
  
    } catch (error) {
      if (process.env.NODE_ENV !== "production") {
        console.error(error);
      }
    }
};