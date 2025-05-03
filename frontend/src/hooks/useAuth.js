import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

/**
 * useAuth provides access to the AuthContext.
 * Throws if used outside the provider.
 * @returns {import('../context/AuthContext').AuthContextValue}
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
