import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

/**
 * UserActions displays user profile, sign in/out, and user email.
 * @returns {JSX.Element}
 */
function UserActions() {
  const { user, signOut } = useContext(AuthContext);

  if (!user) {
    return (
      <Link
        to="/signin"
        className="px-3 py-2 rounded-lg font-medium text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900"
      >
        Sign In
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span
        className="text-sm text-gray-700 dark:text-gray-200"
        aria-label="User email"
      >
        {user.email}
      </span>
      <Link
        to="/profile"
        className="px-2 py-1 rounded-lg text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
        aria-label="Profile"
      >
        Profile
      </Link>
      <button
        onClick={signOut}
        className="px-2 py-1 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900"
        aria-label="Sign out"
      >
        Sign Out
      </button>
    </div>
  );
}

export default UserActions;
