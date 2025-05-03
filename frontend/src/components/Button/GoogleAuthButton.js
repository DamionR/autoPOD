import React, { useState } from "react";
import { supabase } from "../../api/supabase";
import { useNotification } from "../../context/NotificationContext";

/**
 * GoogleAuthButton triggers Supabase Google OAuth login/signup.
 * @param {object} props
 * @param {string} [props.className]
 */
function GoogleAuthButton({ className = "" }) {
  const { addNotification } = useNotification();
  const [loading, setLoading] = useState(false);

  async function handleGoogleAuth() {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });
      if (error) throw error;
      // Redirect handled by Supabase
    } catch (err) {
      addNotification(err.message || "Google sign-in failed", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      className={`btn btn-outline flex items-center justify-center gap-2 w-full ${className}`}
      onClick={handleGoogleAuth}
      disabled={loading}
      aria-label="Sign in with Google"
    >
      <svg
        className="h-5 w-5"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <g>
          <path
            d="M44.5 20H24V28.5H36.9C35.5 33.1 31.2 36.5 24 36.5C16.3 36.5 10 30.2 10 22.5C10 14.8 16.3 8.5 24 8.5C27.2 8.5 30.1 9.6 32.3 11.5L38.1 6.1C34.5 2.9 29.6 1 24 1C11.8 1 2 10.8 2 23C2 35.2 11.8 45 24 45C36.2 45 46 35.2 46 23C46 21.3 45.8 19.7 45.5 18.2L44.5 20Z"
            fill="#FFC107"
          />
          <path
            d="M6.3 14.7L13.1 19.6C15 15.7 19.1 13 24 13C26.5 13 28.7 13.8 30.4 15.1L36.2 9.7C33.2 7.1 28.9 5.5 24 5.5C16.9 5.5 10.7 10.2 6.3 14.7Z"
            fill="#FF3D00"
          />
          <path
            d="M24 45C29.5 45 34.2 43.1 37.7 39.9L31.3 34.7C29.5 36 27 36.8 24 36.8C16.8 36.8 10.7 32.1 8.2 25.8L1.4 30.7C5.7 38.1 14.1 45 24 45Z"
            fill="#4CAF50"
          />
          <path
            d="M44.5 20H24V28.5H36.9C36.2 31.1 34.5 33.1 32.3 34.7L38.7 39.9C42.1 36.8 44.5 32.1 44.5 27.5C44.5 25.7 44.3 24 44 22.5L44.5 20Z"
            fill="#1976D2"
          />
        </g>
      </svg>
      {loading ? "Signing in..." : "Sign in with Google"}
    </button>
  );
}

export default GoogleAuthButton;
