import React, { useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Discover.module.css";
import { getProfile, getPlaylists, createPlaylist, editPlaylist, deletePlaylist } from "./helpers/userDataHelper";
import useScreenSize from "../../hooks/useScreenSize";
import logo from "../../pictures/logo-white-cropped.png";
import Sidebar from "./Sidebar";
import Recommendations from "./recommendations/Recommendations";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LineSpacer from "../../UI/LineSpacer";
import LoadingRing from "../../UI/LoadingRing";
import DropdownMenu from "./DropdownMenu";
import Playlists from "./playlist/Playlists";
import Filters from "./filter/Filters";

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

  // Use React Router's hooks to access the navigation function
  const navigate = useNavigate();

  // Check if the screen size is small and adjust styling accordingly
  const isSmallScreen = useScreenSize();

  // Helper method to re-route to login-page upon invalid authorization
  const handleUnauthorized = () => {
    localStorage.removeItem("spotify_access_token");
    navigate("/login");
  };

  // Fetch user data and playlists when the component mounts
  useEffect(() => {

    const fetchData = async () => {

      // Obtain the access token from local storage
      const token = localStorage.getItem("spotify_access_token");
      if (!token) return;

      // Set the access token
      setAccessToken(token);

      console.log("Fetching data...");

      // Fetch user profile data using access token
      const profileData = await getProfile(token, handleUnauthorized);

      if (profileData) {

        // Set the user data
        setUserData(profileData);

        console.log(profileData)

        // Fetch user's playlists using access token and user id
        const userId = profileData.id;
        const playlistsData = await getPlaylists(token, userId, handleUnauthorized);

        if (playlistsData) {
          // Filter playlists to include only those owned by the user or are collaborative
          const editablePlaylists = playlistsData.filter(
            (playlist) => playlist.owner.id === userId || playlist.collaborative
          );

          console.log(editablePlaylists)

          // Set the user's playlists
          setPlaylists(editablePlaylists);

          // Since the data is loaded, we set the loading state to false
          setIsLoading(false);
        }
      }
    };

    fetchData();
    // eslint-disable-next-line
  }, []);

  // Handler to select a playlist
  const onSelectedPlaylistHandler = (playlist) => {
    setSelectedPlaylist(playlist);
  };

  // Handler to add a new playlist
  const addPlaylistHandler = async (playlist) => {

    console.log("Creating new playlist...");

    // Delegate creating a new playlist to backend
    const newPlaylist = await createPlaylist(accessToken, userData.id, playlist.name, playlist.description, playlist.image, handleUnauthorized);

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
    const editedPlaylist = await editPlaylist(accessToken, playlist.id, playlist.name, playlist.description, imageFile, handleUnauthorized);

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

    const response = await deletePlaylist(accessToken, userData.id, playlist.id, handleUnauthorized);

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

  // Destructuring props
  const { userData, playlists, selectedPlaylist, onSelectedPlaylist, onAddPlaylist, onEditPlaylist, onDeletePlaylist } = props;

  const [selectedMenu, setSelectedMenu] = useState("Recommendations");

  // Get the user's profile picture URL if available
  const profileImage = userData && userData.images && userData.images.length > 0
    ? userData.images[0].url
    : null;

  const renderContent = () => {

    switch (selectedMenu) {
      case "Recommendations":
        return <Recommendations />;
      case "Playlists":
        return <Playlists playlists={playlists}
          selected={selectedPlaylist}
          onSelected={onSelectedPlaylist}
          onAddPlaylist={onAddPlaylist}
          onEditPlaylist={onEditPlaylist}
          onDeletePlaylist={onDeletePlaylist}
        />;
      case "Filters":
        return <Filters />;
      default:
        return <Recommendations />;
    }
  };

  return (
    <Fragment>
      <div className={classes.content}>
        <header className={classes.header}>
          <img className={classes.logo} src={logo} alt="Logo" />
          <div className={classes["header-group"]}>
            {profileImage ? (
              <img className={classes["profile-icon"]} src={profileImage} alt="Profile" />
            ) : (
              <AccountCircleIcon style={{ cursor: "pointer", fontSize: 40 }} />
            )}
            <DropdownMenu onMenuSelect={setSelectedMenu} />
          </div>
        </header>
        <LineSpacer />
        {renderContent()}
      </div>
      <div className={`${classes["wave-spacer"]} ${classes["wave-layer"]}`} />
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