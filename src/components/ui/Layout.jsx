import { useLocation } from "react-router-dom";
import { useEffect } from "react";

import Navbar from "../Navbar";

export default function Layout({ children }) {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isDetailsPage = location.pathname.startsWith("/book/"); // Changed to startsWith for dynamic IDs

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className={`min-h-screen bg-(--bg) text-(--text) transition-colors duration-300`}>
      {!isHomePage && <Navbar />}

      <main className={`max-w-6xl mx-auto px-4 ${isHomePage || isDetailsPage ? "py-4" : "py-8"}`}>
        {children}
      </main>
    </div>
  );
}
