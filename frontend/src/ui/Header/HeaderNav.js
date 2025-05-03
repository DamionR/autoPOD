import React from "react";
import { NavLink } from "react-router-dom";

/**
 * HeaderNav displays navigation links and the dark mode toggle.
 * @returns {JSX.Element}
 */
function HeaderNav() {
  // TODO: Replace with actual dark mode toggle logic if needed
  return (
    <nav aria-label="Main navigation" className="flex items-center gap-4">
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          `px-3 py-2 rounded-lg font-medium transition-colors ${
            isActive
              ? "bg-gray-200 dark:bg-gray-700"
              : "hover:bg-gray-100 dark:hover:bg-gray-800"
          }`
        }
      >
        Dashboard
      </NavLink>
      <NavLink
        to="/products"
        className={({ isActive }) =>
          `px-3 py-2 rounded-lg font-medium transition-colors ${
            isActive
              ? "bg-gray-200 dark:bg-gray-700"
              : "hover:bg-gray-100 dark:hover:bg-gray-800"
          }`
        }
      >
        Products
      </NavLink>
      <NavLink
        to="/templates"
        className={({ isActive }) =>
          `px-3 py-2 rounded-lg font-medium transition-colors ${
            isActive
              ? "bg-gray-200 dark:bg-gray-700"
              : "hover:bg-gray-100 dark:hover:bg-gray-800"
          }`
        }
      >
        Templates
      </NavLink>
      {/* Add more links as needed */}
      <button
        aria-label="Toggle dark mode"
        className="ml-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
        // onClick={toggleDarkMode}
      >
        <span role="img" aria-label="Dark mode">
          🌙
        </span>
      </button>
    </nav>
  );
}

export default HeaderNav;
