import React from "react";
import classes from "./LoadingRing.module.css";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const LoadingRing = () => {

  return (
    <Box className={classes.container}>
      <CircularProgress style={{ color: "white" }} />
    </Box>
  );
}

export default LoadingRing;