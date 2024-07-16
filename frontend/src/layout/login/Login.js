import React from "react";
import classes from "./Login.module.css";
import LoginButton from "./LoginButton";
import logo from "../../pictures/logo-white.png"

/**
 * Login component that provides the login interface.
 * @returns {JSX.Element} The rendered login component.
 */
const Login = () => {

    return (
        <div className={classes.container}>
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
        </div>
    );
};

export default Login;