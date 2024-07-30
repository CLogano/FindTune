import React from "react";
import classes from "./Playlist.module.css";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

/**
 * Playlist component that displays a single playlist item.
 * @param {object} props - Props passed to the component.
 * @param {string} props.name - The name of the playlist.
 * @param {string} props.description - The description of the playlist.
 * @param {string} props.icon - The URL of the playlist icon. If not provided, a default icon will be displayed.
 * @param {boolean} props.isSelected - Whether the playlist is selected.
 * @param {function} props.onSelect - Function to call when the playlist is selected.
 * @returns {JSX.Element} The rendered playlist component.
 */
const Playlist = (props) => {

    // Destructuring props
    const { name, icon, description, isSelected, onSelect, onEdit, onDelete } = props;

    return (
        <li className={`${classes.container} ${isSelected ? classes.selected : ""}`} onClick={onSelect}>
            {icon ? (
                <img className={classes.icon} src={icon} alt="Playlist icon" />
            ) : (
                <MusicNoteIcon className={classes.icon} style={{ fontSize: 50 }} />
            )}
            <div className={classes["inner-container"]}>
                <div className={classes.name}>{name}</div>
                <div className={classes.description}>{description ? description : "Playlist"}</div>
            </div>
            {isSelected && (
                <div className={classes["inner-container-2"]}>
                    <EditIcon
                        className={classes["edit-icon"]}
                        onClick={onEdit}
                    />
                    <DeleteIcon
                        className={classes["delete-icon"]}
                        onClick={onDelete}
                    />
                </div>
            )}
        </li>
    );
};

export default Playlist;