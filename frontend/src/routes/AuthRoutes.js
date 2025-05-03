import React from "react";
import { Routes, Route } from "react-router-dom";
import SignIn from "../auth/SignIn";
import SignUp from "../auth/SignUp";
import PasswordReset from "../auth/PasswordReset";
import Profile from "../auth/Profile";

/**
 * AuthRoutes defines all authentication-related routes.
 * @returns {JSX.Element}
 */
function AuthRoutes() {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/password-reset" element={<PasswordReset />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default AuthRoutes;
