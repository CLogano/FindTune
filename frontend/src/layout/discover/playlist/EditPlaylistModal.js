import React, { useState, useEffect } from "react";
import classes from "./EditPlaylistModal.module.css";
import Modal from "../../../UI/Modal";
import InputField from "../../../UI/InputField";
import MusicNoteIcon from "@mui/icons-material/MusicNote";

/**
 * EditPlaylistModal component for editing an existing playlist.
 * @param {object} props - Props passed to the component.
 * @param {function} props.closeModal - Function to close the modal.
 * @param {object} props.playlist - The playlist object to be edited.
 * @param {function} props.onEditPlaylist - Function to call when the playlist is edited.
 * @returns {JSX.Element} The rendered EditPlaylistModal component.
 */
const EditPlaylistModal = (props) => {

    // Destructuring props
    const { closeModal, playlist, onEditPlaylist } = props;

    // State to keep track of the title of the new playlist
    const [title, setTitle] = useState(playlist.name);
    // State to keep track of the description of the new playlist
    const [description, setDescription] = useState(playlist.description);
    // State to keep track of the icon of the new playlist
    const [icon, setIcon] = useState(playlist.images && playlist.images.length > 0 ? playlist.images[0].url : null);
    // State to keep track of the form's validity
    const [isFormValid, setIsFormValid] = useState(true);

    // Handler to submit the form
    const onSubmitHandler = (event) => {
        
        // Prevent page from refreshing
        event.preventDefault(); 

        // Create a new playlist object
        const editedPlaylist = {
            ...playlist,
            name: title,
            description,
            images: icon ? [{ url: typeof icon === "string" ? icon : URL.createObjectURL(icon) }] : playlist.images
        };

        // Propagate the playlist upwards
        onEditPlaylist(editedPlaylist);

        // Close the modal afterwards
        closeModal();
    };

    // Handler to manage the title of the playlist
    const onTitleChangeHandler = (event) => {
        setTitle(event.target.value);
    };

    // Handler to manage the description of the playlist
    const onDescriptionChangeHandler = (event) => {
        setDescription(event.target.value);
    };

    // Handler to manage the icon of the playlist
    const onIconChangeHandler = (event) => {
        setIcon(event.target.files[0]);
    };

    // Update form validity whenever the title changes
    useEffect(() => {
        setIsFormValid(title.trim().length > 0);
    }, [title]);

    return (
        <Modal onClose={closeModal}>
            <form className={classes["edit-outer-container"]} onSubmit={onSubmitHandler}>
                <h1>Edit <span>{playlist.name}</span></h1>
                <div className={classes["edit-inner-container"]}>
                    <div className={classes["edit-inner-container-2"]}>
                        <InputField title="Title" onTextChange={onTitleChangeHandler} value={title} />
                        <InputField title="Description (optional)" onTextChange={onDescriptionChangeHandler} value={description} />
                    </div>
                    <div className={classes["edit-image-container"]}>
                        <h4>Image (optional)</h4>
                        <div
                            className={classes["edit-image-inner-container"]}
                            onClick={() => document.getElementById("fileInput").click()}
                        >
                            {icon ? (
                                <img src={typeof icon === "string" ? icon : URL.createObjectURL(icon)} alt="Uploaded Preview" className={classes["image-preview"]} />
                            ) : (
                                <MusicNoteIcon style={{ fontSize: 60 }} />
                            )}
                        </div>
                        <input
                            id="fileInput"
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={onIconChangeHandler}
                        />
                    </div>
                </div>
                <button
                    className={classes["submit-button"]}
                    type="submit"
                    disabled={!isFormValid}
                    style={{ opacity: isFormValid ? 1 : 0.5 }}
                >
                    Save
                </button>
            </form>
        </Modal>
    );
};

export default EditPlaylistModal;