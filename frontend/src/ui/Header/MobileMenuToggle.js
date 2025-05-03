import React from "react";

/**
 * MobileMenuToggle displays a hamburger button for mobile nav.
 * @param {Object} props
 * @param {boolean} props.open - Whether the menu is open
 * @param {function} props.onClick - Click handler
 * @returns {JSX.Element}
 */
function MobileMenuToggle({ open, onClick }) {
  return (
    <button
      className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      aria-controls="mobile-menu"
      onClick={onClick}
      type="button"
    >
      <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        {open ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        )}
      </svg>
    </button>
  );
}

export default MobileMenuToggle;
