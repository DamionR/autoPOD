import React from "react";

/**
 * Loader spinner component.
 * @param {Object} props
 * @param {string} [props.size] - Tailwind size class (e.g., 'w-8 h-8')
 * @param {string} [props.color] - Tailwind color class (e.g., 'border-blue-500')
 * @param {string} [props.label] - Accessible loading label
 * @returns {JSX.Element}
 */
function Loader({
  size = "w-8 h-8",
  color = "border-blue-500",
  label = "Loading...",
}) {
  return (
    <div
      className="flex justify-center items-center h-full"
      role="status"
      aria-live="polite"
    >
      <div
        className={`${size} border-4 ${color} border-t-transparent rounded-full animate-spin`}
        aria-hidden="true"
      />
      <span className="sr-only">{label}</span>
    </div>
  );
}

export default Loader;
