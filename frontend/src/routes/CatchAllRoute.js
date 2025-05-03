import React from "react";
import { Routes, Route } from "react-router-dom";

/**
 * CatchAllRoute renders a 404 Not Found page for unmatched routes.
 * @returns {JSX.Element}
 */
function CatchAllRoute() {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full py-16">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
        Page not found.
      </p>
      <a href="/" className="text-blue-600 hover:underline">
        Go to Home
      </a>
    </div>
  );
}

export default CatchAllRoute;
