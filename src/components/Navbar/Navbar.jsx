// ==============================
// Navbar — Top Navigation Bar
// ==============================
// Contains logo, nav links, dark/light toggle, and user profile.

import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import {
  FiSun,
  FiMoon,
  FiMenu,
  FiX,
  FiHome,
  FiPlusCircle,
  FiLogOut,
} from "react-icons/fi";
import finTrackLogo from "../../assets/finTracklogo (2).png";
import "./Navbar.css";

export default function Navbar() {
  const { darkMode, toggleTheme } = useTheme();
  const { currentUser, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  // Get user initials for avatar
  const getInitials = () => {
    if (!currentUser) return "U";
    const name = currentUser.displayName || currentUser.email || "User";
    return name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {/* Logo */}
        <Link to="/dashboard" className="navbar-logo">
          <img src={finTrackLogo} alt="FinTrack" className="logo-img" />
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

          {/* User Avatar with dropdown */}
          <div className="user-section">
            <div className="user-avatar" title={currentUser?.displayName || currentUser?.email || "User"}>
              {currentUser?.photoURL ? (
                <img src={currentUser.photoURL} alt="" className="avatar-img" />
              ) : (
                <span>{getInitials()}</span>
              )}
            </div>
          </div>

          {/* Logout */}
          <button className="icon-btn logout-btn" onClick={handleLogout} title="Logout">
            <FiLogOut />
          </button>

          {/* Mobile Menu Toggle */}
          <button className="icon-btn menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>
    </nav>
  );
}
