// src/components/Navbar.tsx
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiSearch, FiUser, FiMenu, FiX } from "react-icons/fi";
import defaultLogo from "../assets/flowers.jpg";

export default function Navbar() {
  const location = useLocation();

  const [logoSrc, setLogoSrc] = useState<string>(defaultLogo);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Load logo path from localStorage (if stored)
  useEffect(() => {
    const storedLogo = localStorage.getItem("logoPath");
    if (storedLogo) setLogoSrc(storedLogo);
  }, []);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/flowers", label: "Flowers" },
    { to: "/message-of-flowers", label: "Messages" },
    { to: "/art-gallery", label: "Art Gallery" },
    { to: "/floral-gems", label: "Floral Gems" },
    { to: "/floral-journey", label: "Journey" },
    { to: "/flower-game", label: "Game" },
    { to: "/blogs", label: "Blogs" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg">
              <img
                src={logoSrc}
                alt="FloraVerse Logo"
                className="h-10 w-10 object-cover rounded-lg"
              />
            </div>
            <span className="text-xl font-bold text-gray-900">
              FlowerSong
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                  location.pathname === link.to
                    ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white"
                    : "text-gray-700 hover:text-rose-600 hover:bg-rose-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-3">
            <button className="p-2 text-gray-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors">
              <FiSearch className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors">
              <FiUser className="w-5 h-5" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 text-gray-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <FiX className="w-6 h-6" />
              ) : (
                <FiMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                  location.pathname === link.to
                    ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white"
                    : "text-gray-700 hover:text-rose-600 hover:bg-rose-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
