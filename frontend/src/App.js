import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./layout/login/Login";
import Callback from "./layout/callback/Callback";
import Discover from "./layout/discover/Discover";

/**
 * Main application component that defines the routes for the app.
 * @returns {JSX.Element} The rendered routes of the application.
 */
function App() {

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/callback" element={<Callback />} />
      <Route path="/discover" element={<Discover />} />
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
