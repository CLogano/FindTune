import React, { useState, useEffect, Fragment } from "react";
import classes from "./Discover.module.css";
import { getProfile, getPlaylists, createPlaylist, editPlaylist, deletePlaylist } from "./helpers/userDataHelper";
import useScreenSize from "../../hooks/useScreenSize";
import logo from "../../pictures/logo-white-cropped.png";
import Sidebar from "./Sidebar";
import Recommendations from "./Recommendations";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LineSpacer from "../../UI/LineSpacer";
import LoadingRing from "../../UI/LoadingRing";

/**
 * Discover component that recommends new music to users based on spotify data and filters.
 * @returns {JSX.Element} The rendered discover component.
 */
const Discover = () => {

  // State to keep track of the user's spotify access token
  const [accessToken, setAccessToken] = useState("");
  // State to keep track of the user's data
  const [userData, setUserData] = useState(null);
  // State to keep track of user's playlists
  const [playlists, setPlaylists] = useState([]);
  // State to keep track of the selected playlist
  const [selectedPlaylist, setSelectedPlaylist] = useState(0);
  // State to keep track of the loading state
  const [isLoading, setIsLoading] = useState(true);

  // Check if the screen size is small and adjust styling accordingly
  const isSmallScreen = useScreenSize();

  // // Set the access token when the component mounts
  // useEffect(() => {

  //   const token = localStorage.getItem("spotify_access_token");
  //   setAccessToken(token);

  // }, []);

  // // Fetch user data when the accessToken changes
  // useEffect(() => {

  //   const fetchUserProfile = async () => {

  //     if (!accessToken) return;

  //     // Fetch user profile data using access token
  //     const profileData = await getProfile(accessToken);
  //     console.log(profileData);
  //     setUserData(profileData);
  //   };

  //   fetchUserProfile();

  // }, [accessToken]);


  // useEffect(() => {

  //   const fetchUserPlaylists = async () => {

  //     if (!userData) return;

  //     // Obtain the user's spotify id
  //     const userId = userData.id;

  //     // Fetch user's playlists using access token
  //     const playlistsData = await getPlaylists(accessToken, userId);

  //     // Filter playlists to include only those owned by the user or are collaborative
  //     const editablePlaylists = playlistsData.filter(playlist =>
  //       playlist.owner.id === userId || playlist.collaborative
  //     );

  //     console.log(editablePlaylists);
  //     setPlaylists(editablePlaylists)

  //     setIsLoading(false);
  //   }

  //   fetchUserPlaylists();

    
  // }, [userData]);

  // Fetch user data and playlists when the component mounts
  useEffect(() => {

    const fetchData = async () => {
      const token = localStorage.getItem("spotify_access_token");
      if (!token) return;

      setAccessToken(token);

      console.log("Fetching data...");

      try {
        // Fetch user profile data using access token
        const profileData = await getProfile(token);
        setUserData(profileData);

        console.log(profileData)

        // Fetch user's playlists using access token and user ID
        const userId = profileData.id;
        const playlistsData = await getPlaylists(token, userId);

        // Filter playlists to include only those owned by the user or are collaborative
        const editablePlaylists = playlistsData.filter(
          (playlist) => playlist.owner.id === userId || playlist.collaborative
        );

        console.log(editablePlaylists)

        setPlaylists(editablePlaylists);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handler to select a playlist
  const onSelectedPlaylistHandler = (playlist) => {
    setSelectedPlaylist(playlist);
  };

  // Handler to add a new playlist
  const addPlaylistHandler = async (playlist) => {

    console.log("Creating new playlist...");

    // Delegate creating a new playlist to backend
    const newPlaylist = await createPlaylist(accessToken, userData.id, playlist.name, playlist.description, playlist.image);

    if (newPlaylist) {
      setPlaylists((prevPlaylists) => {
        const updatedPlaylists = [
          ...prevPlaylists,
          {
            ...newPlaylist,
            images: playlist.image
              ? [{ url: typeof playlist.image === "string" ? playlist.image : URL.createObjectURL(playlist.image) }]
              : []
          }
        ];
        // Select the newly added playlist
        setSelectedPlaylist(updatedPlaylists.length - 1);
        return updatedPlaylists;
      });
    }
  };

  // Handler to edit a playlist
  const editPlaylistHandler = async (playlist) => {

    console.log("Editing playlist...");

    // Delegate editing the playlist to backend
    const imageFile = playlist.image instanceof File ? playlist.image : null;
    const editedPlaylist = await editPlaylist(accessToken, playlist.id, playlist.name, playlist.description, imageFile);

    if (editedPlaylist) {
      setPlaylists((prevPlaylists) => {
        // Create a new array of playlists
        const updatedPlaylists = prevPlaylists.map((p) =>
          p.id === playlist.id
            ? {
              ...p,
              name: playlist.name,
              description: playlist.description,
              images: playlist.image
                ? [{ url: typeof playlist.image === "string" ? playlist.image : URL.createObjectURL(playlist.image) }]
                : []
            }
            : p
        );
        return updatedPlaylists;
      });
    }
  };

  // Handler to delete a playlist
  const deletePlaylistHandler = async (playlist) => {

    console.log("Deleting playlist...");

    const response = await deletePlaylist(accessToken, userData.id, playlist.id);

    if (response.success) {
      setPlaylists((prevPlaylists) =>
        prevPlaylists.filter((p) => p.id !== playlist.id)
      );
      // Reset the selected playlist to the first element
      setSelectedPlaylist(0);
    } else {
      console.error("Error deleting playlist:", response.error);
    }
  };

  return (
    <div className={classes.container}>
      {isLoading ? <LoadingRing /> :
        isSmallScreen ?
          <SmallScreenLayout
            userData={userData}
            playlists={playlists}
            selectedPlaylist={selectedPlaylist}
            onSelectedPlaylist={onSelectedPlaylistHandler}
            onAddPlaylist={addPlaylistHandler}
            onEditPlaylist={editPlaylistHandler}
            onDeletePlaylist={deletePlaylistHandler}
          /> :
          <LargeScreenLayout
            userData={userData}
            playlists={playlists}
            selectedPlaylist={selectedPlaylist}
            onSelectedPlaylist={onSelectedPlaylistHandler}
            onAddPlaylist={addPlaylistHandler}
            onEditPlaylist={editPlaylistHandler}
            onDeletePlaylist={deletePlaylistHandler}
          />}
      </div>
  );
};

/**
 * Component for small screen layout.
 * @param {object} props - Props passed to the component.
 * @returns {JSX.Element} The rendered small screen layout component.
 */
const SmallScreenLayout = (props) => {

  return (
    <Fragment>

    </Fragment>
  );
};

/**
 * Component for large screen layout.
 * @param {object} props - Props passed to the component.
 * @param {object} props.userData - User data including account name, profile picture, etc.
 * @param {number} props.selectedPlaylist - Index of the currently selected playlist.
 * @param {function} props.onSelectedPlaylist - Function to call when a playlist is selected.
 * @param {Array} props.playlists - List of playlists.
 * @returns {JSX.Element} The rendered large screen layout component.
 */
const LargeScreenLayout = (props) => {

  // Destructuring props
  const { userData, playlists, selectedPlaylist, onSelectedPlaylist, onAddPlaylist, onEditPlaylist, onDeletePlaylist } = props;

  // Get the user's profile picture URL if available
  const profileImage = userData && userData.images && userData.images.length > 0
    ? userData.images[0].url
    : null;

  return (
    <Fragment>
      <div className={classes.left}>
        <header className={classes.header}>
          <img className={classes.logo} src={logo} alt="Logo" />
          {profileImage ? (
            <img className={classes["profile-icon"]} src={profileImage} alt="Profile" />
          ) : (
            <AccountCircleIcon style={{ cursor: "pointer", fontSize: 40 }} />
          )}
        </header>
        <LineSpacer />
        <Sidebar
          selectedPlaylist={selectedPlaylist}
          onSelectedPlaylist={onSelectedPlaylist}
          playlists={playlists}
          onAddPlaylist={onAddPlaylist}
          onEditPlaylist={onEditPlaylist}
          onDeletePlaylist={onDeletePlaylist}
        />
      </div>
      <div className={`${classes["wave-spacer"]} ${classes['wave-layer']}`} />
      <div className={classes.right}>
        <Recommendations />
      </div>
    </Fragment>
  );
};

export default Discover;