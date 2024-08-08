import React, { useState, useEffect } from "react";
import classes from "./AddPlaylistModal.module.css";
import Modal from "../../../UI/Modal";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import InputField from "../../../UI/InputField";

/**
 * AddPlaylistModal component allows the user to create a new playlist.
 * @param {object} props - Props passed to the component.
 * @param {function} props.closeModal - Function to close the modal.
 * @param {function} props.onAddPlaylist - Function to add the new playlist.
 * @returns {JSX.Element} The rendered add playlist modal component.
 */
const AddPlaylistModal = (props) => {

    // Destructuring props
    const { closeModal, onAddPlaylist } = props;

    // State to keep track of the title of the new playlist
    const [title, setTitle] = useState("");
    // State to keep track of the description of the new playlist
    const [description, setDescription] = useState("");
    // State to keep track of the icon of the new playlist
    const [icon, setIcon] = useState(null);
    // State to keep track of the form's validity
    const [isFormValid, setIsFormValid] = useState(false);
    // State to keep track of the error message for the icon file
    const [iconError, setIconError] = useState("");

    // Handler to submit the form
    const onSubmitHandler = (event) => {

        // Prevent page from refreshing
        event.preventDefault(); 

        // Create a new playlist object
        const newPlaylist = {
            id: Date.now().toString(),
            name: title,
            description,
            image: icon
        };

        // Propagate the playlist upwards
        onAddPlaylist(newPlaylist);

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
    // Icons can have a max size of 256 KB
    const onIconChangeHandler = (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileSizeInKB = file.size / 1024;
            if (fileSizeInKB > 256) {
                setIconError("Image size exceeds 256 KB");
            } else {
                setIconError("");
                setIcon(file);
            }
        }
    };

    // Update form validity whenever the title changes
    useEffect(() => {
        setIsFormValid(title.trim().length > 0);
    }, [title]);

    return (
        <Modal onClose={closeModal}>
            <form className={classes["add-outer-container"]} onSubmit={onSubmitHandler}>
                <h1>Create a playlist</h1>
                <div className={classes["add-inner-container"]}>
                    <div className={classes["add-inner-container-2"]}>
                        <InputField title="Title" onTextChange={onTitleChangeHandler} />
                        <InputField title="Description (optional)" onTextChange={onDescriptionChangeHandler} />
                    </div>
                    <div className={classes["add-image-container"]}>
                        <h4>Image (optional)</h4>
                        <div
                            className={classes["add-image-inner-container"]}
                            onClick={() => document.getElementById("fileInput").click()}
                        >
                            {icon ? (
                                <img src={URL.createObjectURL(icon)} alt="Uploaded Preview" className={classes["image-preview"]} />
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
                        {iconError && <p className={classes["image-error-text"]}>{iconError}</p>}
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

export default AddPlaylistModal;