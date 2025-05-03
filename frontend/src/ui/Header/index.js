import React, { useState } from "react";
import HeaderLogo from "./HeaderLogo";
import HeaderNav from "./HeaderNav";
import UserActions from "./UserActions";
import MobileMenuToggle from "./MobileMenuToggle";

/**
 * Header component for the app, composed of logo, nav, user actions, and mobile menu toggle.
 * @returns {JSX.Element}
 */
function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="w-full bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <HeaderLogo />
        <div className="hidden md:flex items-center gap-6">
          <HeaderNav />
        </div>
        <div className="flex items-center gap-4">
          <UserActions />
          <MobileMenuToggle
            open={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          />
        </div>
      </div>
      {/* Mobile menu */}
      {mobileOpen && (
        <nav id="mobile-menu" className="md:hidden px-4 pb-4">
          <HeaderNav />
        </nav>
      )}
    </header>
  );
}

export default Header;
