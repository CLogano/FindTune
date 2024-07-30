import React, { Fragment } from "react";
import classes from "./InputField.module.css";

const InputField = (props) => {

    const { title, onTextChange } = props;

    return (
        <Fragment>
            <h4>{title}</h4>
            <input className={classes.input} onChange={onTextChange} />
        </Fragment>
    );
};

export default InputField;