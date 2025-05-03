import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader from "../ui/Loader";

/**
 * ProtectedRoute restricts access to authenticated users, redirects otherwise.
 * @param {object} props
 * @param {JSX.Element} props.children - Protected content
 * @returns {JSX.Element}
 */
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Loader label="Checking authentication..." />;
  if (!user) {
    // Only allow safe return_to (no open redirect)
    const safePath = location.pathname.startsWith("/")
      ? location.pathname
      : "/";
    return (
      <Navigate
        to={`/signin?return_to=${encodeURIComponent(safePath)}`}
        replace
      />
    );
  }
  return children;
}

export default ProtectedRoute;
