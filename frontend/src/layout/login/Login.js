import React, { useState, useEffect, Fragment } from "react";
import classes from "./Login.module.css";
import LoginButton from "./LoginButton";
import logo from "../../pictures/logo-white.png"

/**
 * Login component that provides the login interface.
 * @returns {JSX.Element} The rendered login component.
 */
const Login = () => {

    // Check to see if the screen is small, and update the layout of the component if necessary.
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1024);

    useEffect(() => {

        const checkScreenSize = () => {
            setIsSmallScreen(window.innerWidth <= 1024);
        };
        window.addEventListener("resize", checkScreenSize);

        return () => window.removeEventListener("resize", checkScreenSize);

    }, []);

    return (
        <div className={classes.container}>
            {isSmallScreen ?
                <Fragment>
                    <div className={classes.content}>
                        <img className={classes.logo} src={logo} alt="Logo" />
                        <h2>Welcome Back!</h2>
                        <LoginButton />
                        <p>Login securely using your Spotify account.</p>
                    </div>
                    <div className={`${classes.spacer} ${classes['wave-layer']}`} />
                    <footer className={classes.footer}>&copy; FindTune 2024. All rights reserved.</footer>
                </Fragment>
                : <Fragment>
                    <div className={classes.left}>
                        <img className={classes.logo} src={logo} alt="Logo" />
                        <p className={classes.text}>Tired of hearing the same music? You're in the right place.</p>
                        <footer className={classes.footer}>&copy; FindTune 2024. All rights reserved.</footer>
                    </div>
                    <div className={`${classes.spacer} ${classes['wave-layer']}`} />
                    <div className={classes.right}>
                        <h1>FindTune</h1>
                        <div className={classes["right-inner"]}>
                            <h2>Welcome Back!</h2>
                            <LoginButton />
                            <p>Login securely using your Spotify account.</p>
                        </div>
                    </div>
                </Fragment>
            }
            
        </div>
    );
};

export default Login;