import React, { useState, useEffect, Fragment } from "react";
import classes from "./Discover.module.css";
import { getProfile, getPlaylists } from "./helpers/getUserData";
import useScreenSize from "../../hooks/useScreenSize";
import logo from "../../pictures/logo-white-cropped.png";
import Sidebar from "./Sidebar";
import Recommendations from "./Recommendations";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LineSpacer from "../../UI/LineSpacer";

/**
 * Discover component that recommends new music to users based on spotify data and filters.
 * @returns {JSX.Element} The rendered discover component.
 */
const Discover = () => {

  // Obtain Spotify access token
  const accessToken = localStorage.getItem("spotify_access_token");

  // State to keep track of the user's data
  const [userData, setUserData] = useState(null);
  // State to keep track of user's playlists
  const [playlists, setPlaylists] = useState([]);
  // State to manage the selected playlist
  const [selectedPlaylist, setSelectedPlaylist] = useState(0);

  // Check if the screen size is small and adjust styling accordingly
  const isSmallScreen = useScreenSize();

  // Fetch user data and playlists when the component mounts or accessToken changes
  useEffect(() => {

    const fetchData = async () => {
      // Fetch user profile data using access token
      const profileData = await getProfile(accessToken);
      console.log(profileData);
      setUserData(profileData);

      // Fetch user's playlists using access token
      const playlistsData = await getPlaylists(accessToken);

      // Filter playlists to include only those owned by the user or are collaborative
      const editablePlaylists = playlistsData.filter(playlist =>
        playlist.owner.id === profileData.id || playlist.collaborative
      );
      console.log(editablePlaylists);
      setPlaylists(editablePlaylists);
    };

    fetchData();

  }, [accessToken]);

  // Handler to select a playlist
  const onSelectedPlaylistHandler = (playlist) => {
    setSelectedPlaylist(playlist);
  };

  // Handler to add a new playlist
  const addPlaylistHandler = (playlist) => {

    // TO-DO: api call to create new playlist on backend
    // Using dummy playlist for now

    setPlaylists((prevPlaylists) => {
      const updatedPlaylists = [...prevPlaylists, playlist];
      // Select the newly added playlist
      setSelectedPlaylist(updatedPlaylists.length - 1);
      return updatedPlaylists;
    });
  };

  // Handler to edit a playlist
  const editPlaylistHandler = (playlist) => {

    // TO-DO: api call to edit playlist on backend
    // Using dummy playlist for now

    setPlaylists((prevPlaylists) => {
      const updatedPlaylists = [...prevPlaylists, playlist];
      return updatedPlaylists;
    });
  };

  // Handler to delete a playlist
  const deletePlaylistHandler = (playlist) => {

    // TO-DO: api call to delete playlist on backend
    // Using dummy playlist for now

    setPlaylists((prevPlaylists) => prevPlaylists.filter((p) => p.id !== playlist.id));
     // Reset the selected playlist
    setSelectedPlaylist(0);
  };

  return (
    <div className={classes.container}>
      {isSmallScreen ?
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