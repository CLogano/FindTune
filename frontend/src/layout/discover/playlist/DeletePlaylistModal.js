import React from "react";
import classes from "./DeletePlaylistModal.module.css";
import Modal from "../../../UI/Modal";

/**
 * DeletePlaylistModal component.
 * This component renders a modal for deleting a playlist with a confirmation message.
 * 
 * @param {object} props - Props passed to the component.
 * @param {function} props.closeModal - Function to call when the modal needs to be closed.
 * @param {object} props.playlist - The playlist object that is to be deleted.
 * @param {function} props.onDeletePlaylist - Function to call when the playlist needs to be deleted.
 * @returns {JSX.Element} The rendered DeletePlaylistModal component.
 */
const DeletePlaylistModal = (props) => {

    // Destructuring props
    const { closeModal, playlist, onDeletePlaylist } = props;

    // Handler to submit the form
    const onSubmitHandler = () => {
        onDeletePlaylist(playlist);
        closeModal();
    };

    return (
        <Modal onClose={closeModal}>
            <div className={classes["delete-container"]}>
                <h3>Are you sure you want to delete <span className={classes.title}>{playlist.name}</span>?</h3>
                <p>Note: This action cannot be undone.</p>
                <button className={classes["submit-button"]} onClick={onSubmitHandler}>Delete</button>
            </div>
        </Modal>
    );
};

export default DeletePlaylistModal;