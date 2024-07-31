import React from "react";
import classes from "./LineSpacer.module.css";

/**
 * LineSpacer component for rendering a horizontal line spacer.
 * @returns {JSX.Element} The rendered LineSpacer component.
 */
const LineSpacer = () => {
    return (
        <div className={classes["line-spacer"]} />
    );
};

export default LineSpacer;