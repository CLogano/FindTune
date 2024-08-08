import React, { Fragment, useState } from "react"
import classes from "./Playlists.module.css";
import Playlist from "./Playlist";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import AddPlaylistModal from "./AddPlaylistModal";
import EditPlaylistModal from "./EditPlaylistModal";
import DeletePlaylistModal from "./DeletePlaylistModal";

/**
 * Playlists component that displays a list of playlist names and accompanying icon.
 * @param {object} props - Props passed to the component.
 * @param {Array} props.playlists - List of playlists.
 * @param {number} props.selected - Index of the currently selected playlist.
 * @param {function} props.onSelected - Function to call when a playlist is selected.
 * @param {function} props.onAddPlaylist - Function to call when a playlist is added.
 * @returns {JSX.Element} The rendered playlists component.
 */
const Playlists = (props) => {

    // Destructuring props
    const { playlists, selected, onSelected, onAddPlaylist, onEditPlaylist, onDeletePlaylist } = props;

    // State to control the modal for adding playlists
    const [showAddPlaylistModal, setShowAddPlaylistModal] = useState(false);
    // State to control the modal for editing playlists
    const [showEditPlaylistModal, setShowEditPlaylistModal] = useState(false);
    // State to control the modal for deleting playlists
    const [showDeletePlaylistModal, setShowDeletePlaylistModal] = useState(false);
    

    // Mapping each playlist to a Playlist component
    const playlistsAsComponent = playlists.map((playlist, index) => {

        // Extract the image url for playlist's icon
        const imageUrl = playlist.images && playlist.images.length > 0 ? playlist.images[0].url : null;

        return (
            <Playlist
                key={playlist.id}
                id={playlist.id}
                name={playlist.name}
                icon={imageUrl}
                description={playlist.description}
                isSelected={selected === index}
                onSelect={() => onSelected(index)}
                onEdit={() => showEditModalHandler()}
                onDelete={() => showDeleteModalHandler()}
            />   
        );
    });

    // Handler to open the modal for adding playlists
    const showAddModalHandler = () => {
        setShowAddPlaylistModal(true);
    };

    // Handler to close the modal for adding playlists
    const closeAddModalHandler = () => {
        setShowAddPlaylistModal(false);
    };

    // Handler to open the modal for editing playlists
    const showEditModalHandler = () => {
        setShowEditPlaylistModal(true);
    };

    // Handler to close the modal for editing playlists
    const closeEditModalHandler = () => {
        setShowEditPlaylistModal(false);
    };

    // Handler to open the modal for deleting playlists
    const showDeleteModalHandler = () => {
        setShowDeletePlaylistModal(true);
    };

    // Handler to close the modal for deleting playlists
    const closeDeleteModalHandler = () => {
        setShowDeletePlaylistModal(false);
    };

    return (
        <Fragment>
            {showAddPlaylistModal && 
                <AddPlaylistModal
                    closeModal={closeAddModalHandler}
                    onAddPlaylist={onAddPlaylist}
                />
            }
            {showEditPlaylistModal && selected !== null && (
                <EditPlaylistModal
                    closeModal={closeEditModalHandler}
                    playlist={playlists[selected]}
                    onEditPlaylist={onEditPlaylist}
                />
            )}
            {showDeletePlaylistModal && selected !== null && (
                <DeletePlaylistModal
                    closeModal={closeDeleteModalHandler}
                    playlist={playlists[selected]}
                    onDeletePlaylist={onDeletePlaylist}
                />
            )}
            <div className={classes.container}>
                <ul className={classes.list}>
                    {playlistsAsComponent}
                </ul>
                <div className={classes["add-button-outer-container"]}>
                    <IconButton className={classes["add-button-inner-container"]} onClick={showAddModalHandler} aria-label="add playlist">
                        <AddIcon className={classes["add-button-icon"]} style={{ fontSize: 36 }} />
                    </IconButton>
                </div>
                <p>Liked songs will be added to the selected playlist.</p>
            </div>
        </Fragment>
    );
};

export default Playlists;