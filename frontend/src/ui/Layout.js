import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { useAuth } from "../context/AuthContext";

/**
 * Main layout component that wraps all pages
 * Conditionally renders sidebar based on authentication status
 */
export default function Layout() {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  // Don't show sidebar on auth pages
  const isAuthPage = ["/signin", "/signup", "/reset-password"].includes(
    location.pathname
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex flex-1">
        {user && !isAuthPage && <Sidebar />}

        <main className="flex-1 p-4 md:p-6 bg-zinc-50">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}
