import React from "react";

/**
 * Footer component for the Gelato Admin app.
 * Includes copyright, privacy, and terms links. Responsive and accessible.
 * @param {object} props
 * @param {React.ReactNode} [props.children]
 * @returns {JSX.Element}
 */
function Footer({ children }) {
  return (
    <footer
      className="w-full bg-white border-t text-center py-2 text-xs text-gray-500 flex flex-col sm:flex-row sm:justify-center items-center gap-2 sm:gap-4"
      aria-label="Footer"
    >
      <span className="block">
        &copy; {new Date().getFullYear()} Gelato Admin. All rights reserved.
      </span>
      <nav aria-label="Footer links" className="flex gap-2">
        <a
          href="/privacy"
          className="hover:underline focus:underline outline-none"
          tabIndex={0}
          aria-label="Privacy Policy"
        >
          Privacy
        </a>
        <a
          href="/terms"
          className="hover:underline focus:underline outline-none"
          tabIndex={0}
          aria-label="Terms of Service"
        >
          Terms
        </a>
      </nav>
      {children}
    </footer>
  );
}

export default Footer;
