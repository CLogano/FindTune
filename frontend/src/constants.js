const CONSTANTS = {
    apiURL: process.env.NODE_ENV === "production" ? "" : "http://localhost:8080/api",
    frontendURL: process.env.NODE_ENV === "production" ? "" : "http://localhost:3000",
    // spotifyScopes: [
    //     "user-read-private",
    //     "user-read-email",
    //     "user-top-read",
    //     "playlist-read-private",
    //     "playlist-read-collaborative",
    //     "playlist-modify-private",
    //     "playlist-modify-public",
    //     "user-library-read",
    //     "user-library-modify",
    //     "user-read-playback-state",
    //     "user-modify-playback-state",
    //     "user-read-currently-playing",
    //     "streaming"
    // ].join(" ")
};

export default CONSTANTS;