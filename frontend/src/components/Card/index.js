import React from "react";

/**
 * Card component for dashboard/report UI.
 * @param {object} props
 * @param {string} [props.className]
 * @param {React.ReactNode} props.children
 */
export function Card({ className = "", children, ...rest }) {
  return (
    <div
      className={
        "bg-white rounded shadow p-4 border border-zinc-200 " + className
      }
      {...rest}
    >
      {children}
    </div>
  );
}
