// ==============================
// Navbar — Top Navigation Bar
// ==============================
// Contains logo, nav links, dark/light toggle, and user profile.

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import {
  FiSun,
  FiMoon,
  FiMenu,
  FiX,
  FiHome,
  FiPlusCircle,
} from "react-icons/fi";
import "./Navbar.css";

export default function Navbar() {
  const { darkMode, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {/* Logo */}
        <Link to="/dashboard" className="navbar-logo">
          <span className="logo-icon">💰</span>
          <span className="logo-text">FinTrack</span>
        </Link>

        {/* Desktop Nav Links */}
        <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
          <Link
            to="/dashboard"
            className={`nav-link ${isActive("/dashboard") ? "active" : ""}`}
            onClick={() => setMenuOpen(false)}
          >
            <FiHome />
            <span>Dashboard</span>
          </Link>
          <Link
            to="/add-transaction"
            className={`nav-link ${isActive("/add-transaction") ? "active" : ""}`}
            onClick={() => setMenuOpen(false)}
          >
            <FiPlusCircle />
            <span>Add Transaction</span>
          </Link>
        </div>

        {/* Right Actions */}
        <div className="navbar-actions">
          {/* Theme Toggle */}
          <button
            className="icon-btn theme-toggle"
            onClick={toggleTheme}
            title={darkMode ? "Light Mode" : "Dark Mode"}
          >
            {darkMode ? <FiSun /> : <FiMoon />}
          </button>

          {/* User Avatar */}
          <div className="user-section">
            <div className="user-avatar" title="User">
              <span>U</span>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="icon-btn menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>
    </nav>
  );
}
