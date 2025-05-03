import React from "react";

/**
 * HeaderLogo displays the app logo and brand name.
 * @returns {JSX.Element}
 */
function HeaderLogo() {
  return (
    <div className="flex items-center gap-2">
      <img src="/logo192.png" alt="Gelato Admin Logo" className="h-8 w-8" />
      <span className="font-bold text-lg tracking-tight">Gelato Admin</span>
    </div>
  );
}

export default HeaderLogo;
