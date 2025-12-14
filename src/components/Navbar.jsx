import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const location = useLocation();
  const [theme, setTheme] = useState("light");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Load saved theme once
  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    setTheme(saved);

    if (saved === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Reservations", path: "/reserve" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Dev Tools", path: "/debug" },
    { name: "Contact", path: "/contact" },
  ];

  // Animation variants for mobile menu
  const menuVariants = {
    closed: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  };

  // Stagger animation for menu items
  const containerVariants = {
    closed: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    closed: {
      x: 50,
      opacity: 0,
    },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <nav className="bg-[#002379] text-white shadow-xl sticky top-0 z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6 py-2">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="bg-[#FF9F66] rounded-lg p-2 shadow-lg group-hover:shadow-xl 
                          transition-all duration-300 group-hover:scale-110">
            <img src="/public/icons8-store-48.png" className="w-4 h-4" alt="BookNest Logo" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight 
                           group-hover:text-white transition-colors duration-300">
              BookNest
            </h1>
            <p className="text-[#E48F45] text-xs font-medium">
              Your Library Companion
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-2 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5 hover:text-[#6B240C] ${isActive ? "text-[#FF9F66] font-bold" : "text-white hover:bg-[#F5CCA0]"
                  }`}
              >
                {link.name}
              </Link>
            );
          })}

          {/* 🌙 Dark Mode Toggle - Desktop */}
          <button
            onClick={toggleTheme}
            className="ml-4 px-4 py-2 rounded-lg bg-white 
                       text-[#6B240C] font-semibold hover:bg-white 
                       hover:shadow-lg transition-all duration-300
                       transform hover:-translate-y-0.5"
          >
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>
        </div>

        {/* Burger Menu Button - Tablet and Mobile */}
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="lg:hidden p-2 rounded-lg hover:bg-[#003399] transition-colors duration-300"
          aria-label="Open menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 z-[60] lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Menu */}
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 right-0 bottom-0 w-full bg-[#002379] z-[70] lg:hidden overflow-y-auto"
            >
              {/* Close Button */}
              <div className="flex justify-end items-center px-6 py-2">
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-[#003399] transition-colors duration-300"
                  aria-label="Close menu"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Mobile Menu Items */}
              <motion.div
                variants={containerVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-6 gap-6"
              >
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <motion.div key={link.name} variants={itemVariants}>
                      <Link
                        to={link.path}
                        className={`block text-2xl font-bold py-3 px-6 rounded-lg transition-all duration-300 ${isActive
                            ? "text-[#FF9F66] bg-white/10"
                            : "text-white hover:text-[#FF9F66] hover:bg-white/5"
                          }`}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  );
                })}

                {/* Dark Mode Toggle - Mobile */}
                <motion.div variants={itemVariants}>
                  <button
                    onClick={toggleTheme}
                    className="mt-4 px-8 py-3 rounded-lg bg-white 
                               text-[#6B240C] font-bold text-xl hover:bg-[#F5CCA0] 
                               hover:shadow-lg transition-all duration-300
                               transform hover:scale-105"
                  >
                    {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
                  </button>
                </motion.div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
