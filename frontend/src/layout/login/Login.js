import React, { Fragment } from "react";
import classes from "./Login.module.css";
import useScreenSize from "../../hooks/useScreenSize";
import LoginButton from "./LoginButton";
import logo from "../../pictures/logo-white.png"

/**
 * Login component that provides the login interface.
 * @returns {JSX.Element} The rendered login component.
 */
const Login = () => {
    
    // Check if the screen size is small and adjust styling accordingly
    const isSmallScreen = useScreenSize();

    return (
        <div className={classes.container}>
            {isSmallScreen ? <SmallScreenLayout /> : <LargeScreenLayout />}
        </div>
    );
};

// Component for small screen layout
const SmallScreenLayout = () => {

    return (
        <Fragment>
            <div className={classes.content}>
                <img className={classes.logo} src={logo} alt="Logo" />
                <h2>Welcome Back!</h2>
                <LoginButton />
                <p>Login securely using your Spotify account.</p>
            </div>
            <div className={`${classes["wave-spacer"]} ${classes["wave-layer"]}`} />
        </Fragment>
    );
};


// Component for large screen layout
const LargeScreenLayout = () => {

    return (
        <Fragment>
            <div className={classes.left}>
                <img className={classes.logo} src={logo} alt="Logo" />
                <p className={classes.text}>Tired of hearing the same music? You're in the right place.</p>
            </div>
            <div className={`${classes["wave-spacer"]} ${classes["wave-layer"]}`} />
            <div className={classes.right}>
                <h1>FindTune</h1>
                <div className={classes["right-inner"]}>
                    <h2>Welcome Back!</h2>
                    <LoginButton />
                    <p>Login securely using your Spotify account.</p>
                </div>
            </div>
        </Fragment>
    );
};

export default Login;