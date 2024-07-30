import React from "react";
import classes from "./EditPlaylistModal.module.css";
import Modal from "../../../UI/Modal";

const EditPlaylistModal = (props) => {

    // Destructuring props
    const { closeModal, playlist, onEditPlaylist } = props;

    // Handler to submit the form
    const onSubmitHandler = () => {
        onEditPlaylist(playlist);
        closeModal();
    };

    return (
        <Modal onClose={closeModal}>
            
        </Modal>
    );
};

export default EditPlaylistModal;