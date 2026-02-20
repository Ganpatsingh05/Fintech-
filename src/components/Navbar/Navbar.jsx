import { useState, useEffect, useRef } from "react";
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
  FiChevronDown,
} from "react-icons/fi";
import finTrackLogo from "../../assets/finTracklogo (2).png";
import "./Navbar.css";

export default function Navbar() {
  const { darkMode, toggleTheme } = useTheme();
  const { currentUser, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    if (userMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [userMenuOpen]);

  useEffect(() => {
    setMenuOpen(false);
    setUserMenuOpen(false);
  }, [location.pathname]);

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

  const getUserEmail = () => {
    if (!currentUser) return "";
    return currentUser.email || "";
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
    <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="navbar-inner">
        <Link to="/dashboard" className="navbar-logo">
          <div className="logo-container">
            <img src={finTrackLogo} alt="BudgetBuddy" className="logo-img" />
          </div>
          <span className="logo-text">BudgetBuddy</span>
        </Link>

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

        <div className="navbar-actions">
          <button
            className="icon-btn theme-toggle"
            onClick={toggleTheme}
            title={darkMode ? "Light Mode" : "Dark Mode"}
          >
            <span className={`theme-icon ${darkMode ? "rotate-in" : ""}`}>
              {darkMode ? <FiSun /> : <FiMoon />}
            </span>
          </button>

          <div className="user-section" ref={userMenuRef} onClick={() => setUserMenuOpen(!userMenuOpen)}>
            <div className="user-avatar" title={getUserEmail()}>
              {currentUser?.photoURL ? (
                <img src={currentUser.photoURL} alt="" className="avatar-img" />
              ) : (
                <span>{getInitials()}</span>
              )}
              <span className="avatar-status" />
            </div>
            <FiChevronDown className={`user-chevron ${userMenuOpen ? "open" : ""}`} />

            {userMenuOpen && (
              <div className="user-dropdown">
                <div className="dropdown-header">
                  <div className="dropdown-avatar">
                    {currentUser?.photoURL ? (
                      <img src={currentUser.photoURL} alt="" />
                    ) : (
                      <span>{getInitials()}</span>
                    )}
                  </div>
                  <div className="dropdown-info">
                    <span className="dropdown-name">{currentUser?.displayName || "User"}</span>
                    <span className="dropdown-email">{getUserEmail()}</span>
                  </div>
                </div>
                <div className="dropdown-divider" />
                <button className="dropdown-item logout" onClick={handleLogout}>
                  <FiLogOut />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>

          <button className="icon-btn menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>
    </nav>
  );
}
