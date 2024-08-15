import CONSTANTS from "../../../constants";

// Helper method used to fetch the user's profile data from Spotify
export const getProfile = async (accessToken, onUnauthorized) => {

  // Provide the access token in the header
  const headers = {
    Authorization: `Bearer ${accessToken}`
  };

  try {
    // Fetch user's profile data on backend
    const response = await fetch(CONSTANTS.apiURL + "/user/profile", { headers });

    if (response.status === 401) {
      throw new Error("Unauthorized");
    }

    if (!response.ok) {
      throw new Error("Error fetching user data");
    }
    const data = await response.json();
    return data;

  } catch (error) {

    if (process.env.NODE_ENV !== "production") {
      console.error(error);
    }
    if (error.message === "Unauthorized") {
      onUnauthorized();
    }
  }
};

// Helper method used to fetch the user's playlists from Spotify
export const getPlaylists = async (accessToken, userId, onUnauthorized) => {

  // Provide the access token in the header
  const headers = {
    Authorization: `Bearer ${accessToken}`
  };

  const params = new URLSearchParams({ userId });

  try {
    // Fetch user's playlists on backend
    const response = await fetch(`${CONSTANTS.apiURL}/playlists?${params}`, { headers });

    if (response.status === 401) {
      throw new Error("Unauthorized");
    }

    if (!response.ok) {
      throw new Error("Error fetching user playlists");
    }

    const data = await response.json();
    return data.items;

  } catch (error) {

    if (process.env.NODE_ENV !== "production") {
      console.error(error);
    }
    if (error.message === "Unauthorized") {
      onUnauthorized();
    }
  }
};

// Helper method used to create a new playlist and add it to Spotify library
export const createPlaylist = async (accessToken, userId, name, description = "", imageFile = "", onUnauthorized) => {

  // Provide the access token in the header
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json"
  };

  // Convert the image to base64 to be accepted by Spotify API
  const image = imageFile ? await convertToBase64(imageFile): "";

  const body = JSON.stringify({ userId, name, description, image });

  // Create user playlist on backend
  try {

    const response = await fetch(`${CONSTANTS.apiURL}/playlists/create`, {
      method: "POST",
      headers,
      body
    });

    if (response.status === 401) {
      throw new Error("Unauthorized");
    }

    if (!response.ok) {
      throw new Error("Error creating playlist");
    }

    const data = await response.json();

    console.log(data);
    return data;

  } catch (error) {

    if (process.env.NODE_ENV !== "production") {
      console.error(error);
    }
    if (error.message === "Unauthorized") {
      onUnauthorized();
    }
  }
}

// Helper method used to edit an existing playlist and reflect it in Spotify library
export const editPlaylist = async (accessToken, playlistId, name, description = "", imageFile = "", onUnauthorized) => {

  // Provide the access token in the header
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json"
  };

  // Convert the image to base64 to be accepted by Spotify API
  const image = imageFile ? await convertToBase64(imageFile): "";

  const body = JSON.stringify({ playlistId, name, description, image });

  // Edit user playlist on backend
  try {

    const response = await fetch(`${CONSTANTS.apiURL}/playlists/edit`, {
      method: "PUT",
      headers,
      body
    });

    if (response.status === 401) {
      throw new Error("Unauthorized");
    }

    if (!response.ok) {
      throw new Error("Error editing playlist");
    }

    const data = await response.json();
    console.log(data);

    return data;

  } catch (error) {

    if (process.env.NODE_ENV !== "production") {
      console.error(error);
    }
    if (error.message === "Unauthorized") {
      onUnauthorized();
    }
  }
}

// Helper method used to delete an existing playlist and reflect it in Spotify library
export const deletePlaylist = async (accessToken, userId, playlistId, onUnauthorized) => {

  // Provide the access token in the header
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json"
  };

  const body = JSON.stringify({ userId, playlistId });

  // Delete user playlist on backend
  try {
    const response = await fetch(`${CONSTANTS.apiURL}/playlists/delete`, {
      method: "DELETE",
      headers,
      body
    });

    if (response.status === 401) {
      throw new Error("Unauthorized");
    }

    if (!response.ok) {
      throw new Error("Error deleting playlist");
    }

    return { success: true };
    
  } catch (error) {

    if (process.env.NODE_ENV !== "production") {
      console.error(error);
    }
    if (error.message === "Unauthorized") {
      onUnauthorized();
    }

    return { success: false, error: error.message };
  }
};

// Helper method to convert an image file to base64
const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxSize = 256; // Maximum width or height
        let width = img.width;
        let height = img.height;

        // Resize image
        if (width > height) {
          if (width > maxSize) {
            height = Math.round((height *= maxSize / width));
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width = Math.round((width *= maxSize / height));
            height = maxSize;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.7); // Compress image
        resolve(dataUrl.split(',')[1]);
      };
      img.onerror = error => reject(error);
    };
    reader.onerror = error => reject(error);
  });
};