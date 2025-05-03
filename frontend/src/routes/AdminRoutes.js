import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import HealthCheck from "../admin/HealthCheck";
import SyncControls from "../admin/SyncControls";
import Report from "./Report";

/**
 * AdminRoutes defines all admin-only routes.
 * @returns {JSX.Element}
 */
function AdminRoutes() {
  return (
    <Routes>
      <Route element={<ProtectedRoute adminOnly />}>
        {" "}
        {/* Add admin check in ProtectedRoute if needed */}
        <Route path="/admin/health" element={<HealthCheck />} />
        <Route path="/admin/sync" element={<SyncControls />} />
        <Route path="/admin/reports" element={<Report />} />
      </Route>
    </Routes>
  );
}

export default AdminRoutes;
