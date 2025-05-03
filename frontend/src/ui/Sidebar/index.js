import React from "react";
import { NavLink } from "react-router-dom";

/**
 * Sidebar navigation for the Gelato Admin app.
 * Includes links to all main sections, icons, and accessibility features.
 * @returns {JSX.Element}
 */
function Sidebar() {
  return (
    <aside
      className="w-56 bg-white border-r h-full flex flex-col p-4 gap-2"
      aria-label="Sidebar navigation"
    >
      <nav className="flex flex-col gap-2" aria-label="Sidebar main">
        <NavLink
          to="/products"
          className={({ isActive }) =>
            isActive
              ? "font-bold text-primary flex items-center gap-2"
              : "flex items-center gap-2 hover:underline"
          }
          tabIndex={0}
        >
          <span aria-hidden="true">📦</span> Products
        </NavLink>
        <NavLink
          to="/templates"
          className={({ isActive }) =>
            isActive
              ? "font-bold text-primary flex items-center gap-2"
              : "flex items-center gap-2 hover:underline"
          }
          tabIndex={0}
        >
          <span aria-hidden="true">📝</span> Templates
        </NavLink>
        <NavLink
          to="/admin/sync"
          className={({ isActive }) =>
            isActive
              ? "font-bold text-primary flex items-center gap-2"
              : "flex items-center gap-2 hover:underline"
          }
          tabIndex={0}
        >
          <span aria-hidden="true">⚙️</span> Admin
        </NavLink>
        <NavLink
          to="/google-sheets"
          className={({ isActive }) =>
            isActive
              ? "font-bold text-primary flex items-center gap-2"
              : "flex items-center gap-2 hover:underline"
          }
          tabIndex={0}
        >
          <span aria-hidden="true">📊</span> Google Sheets
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
