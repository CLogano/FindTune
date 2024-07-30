import React from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";
import CloseIcon from '@mui/icons-material/Close';

/**
 * Modal component that displays content in a modal dialog.
 * @param {object} props - Props passed to the component.
 * @param {function} props.onClose - Function to call when the modal should be closed.
 * @param {React.ReactNode} props.children - The content to be displayed inside the modal.
 * @returns {JSX.Element} The rendered modal component.
 */
const Modal = (props) => {

    // Destructuring props
    const { onClose , children } = props;

    return ReactDOM.createPortal(
        (
            // Backdrop for the modal, clicking it will close the modal
            <div className={classes.backdrop} onClick={onClose}>
                <section className={classes.modal} onClick={(event) => event.stopPropagation()}>
                    {children}
                    <CloseIcon className={classes["close-icon"]} onClick={onClose} />
                </section>
            </div>
        ),
        // Render the modal into the DOM element with id 'modal-root'
        document.getElementById("modal-root")
    );
};

export default Modal;