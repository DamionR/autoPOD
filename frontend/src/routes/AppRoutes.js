import React from "react";
import AuthRoutes from "./AuthRoutes";
import MainRoutes from "./MainRoutes";
import AdminRoutes from "./AdminRoutes";
import CatchAllRoute from "./CatchAllRoute";

/**
 * AppRoutes composes all route groups: auth, main, admin, and fallback.
 * @returns {JSX.Element}
 */
function AppRoutes() {
  return (
    <>
      <AuthRoutes />
      <MainRoutes />
      <AdminRoutes />
      <CatchAllRoute />
    </>
  );
}

export default AppRoutes;
