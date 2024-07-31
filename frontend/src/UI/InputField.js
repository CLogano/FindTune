import React, { Fragment } from "react";
import classes from "./InputField.module.css";

/**
 * InputField component for rendering an input field with a title.
 * @param {object} props - Props passed to the component.
 * @param {string} props.title - The title of the input field.
 * @param {function} props.onTextChange - Function to call when the text changes.
 * @param {string} [props.value] - The current value of the input field.
 * @returns {JSX.Element} The rendered InputField component.
 */
const InputField = (props) => {

    // Destructuring props
    const { title, onTextChange, value } = props;

    return (
        <Fragment>
            <h4>{title}</h4>
            <input className={classes.input} onChange={onTextChange} value={value}/>
        </Fragment>
    );
};

export default InputField;