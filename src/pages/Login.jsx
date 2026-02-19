import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import {
  FiMail, FiLock, FiLogIn, FiEye, FiEyeOff, FiShield,
  FiTrendingUp, FiPieChart, FiClock, FiCheckCircle,
} from "react-icons/fi";
import logo from "../assets/finTracklogo (2).png";
import "./Auth.css";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      await login(email, password);
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (err) {
      const msg =
        err.code === "auth/user-not-found" || err.code === "auth/wrong-password"
          ? "Invalid email or password"
          : err.code === "auth/invalid-credential"
          ? "Invalid email or password"
          : err.code === "auth/too-many-requests"
          ? "Too many attempts. Try again later"
          : "Login failed. Please try again";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-bg-shapes">
        <span className="bg-shape shape-1" />
        <span className="bg-shape shape-2" />
        <span className="bg-shape shape-3" />
        <span className="bg-shape shape-4" />
        <span className="bg-shape shape-5" />
        <span className="bg-line line-1" />
        <span className="bg-line line-2" />
        <span className="bg-line line-3" />
        <span className="bg-dot-grid dot-grid-1" />
        <span className="bg-dot-grid dot-grid-2" />
        <div className="bg-glow glow-1" />
        <div className="bg-glow glow-2" />
      </div>

      <div className="auth-brand-panel">
        <div className="brand-glow" />
        <div className="brand-content">
          <div className="brand-logo-mark">
            <div className="logo-hexagon">
              <img src={logo} alt="BudgetBuddy" className="logo-img" />
            </div>
            <div className="logo-rings">
              <span className="ring ring-1" />
              <span className="ring ring-2" />
            </div>
          </div>
          <h1 className="brand-name">BudgetBuddy</h1>
          <p className="brand-tagline">Your smart companion for smarter spending</p>

          <div className="brand-features">
            <div className="brand-feature" style={{ animationDelay: "0.1s" }}>
              <div className="feature-icon-wrap">
                <FiTrendingUp />
              </div>
              <div className="feature-text">
                <span className="feature-title">Track Everything</span>
                <span className="feature-desc">Income & expenses in real-time</span>
              </div>
            </div>
            <div className="brand-feature" style={{ animationDelay: "0.2s" }}>
              <div className="feature-icon-wrap">
                <FiPieChart />
              </div>
              <div className="feature-text">
                <span className="feature-title">Smart Analytics</span>
                <span className="feature-desc">Visual charts & insights</span>
              </div>
            </div>
            <div className="brand-feature" style={{ animationDelay: "0.3s" }}>
              <div className="feature-icon-wrap">
                <FiShield />
              </div>
              <div className="feature-text">
                <span className="feature-title">Secure Storage</span>
                <span className="feature-desc">Firebase encrypted data</span>
              </div>
            </div>
            <div className="brand-feature" style={{ animationDelay: "0.4s" }}>
              <div className="feature-icon-wrap">
                <FiClock />
              </div>
              <div className="feature-text">
                <span className="feature-title">Real-time Sync</span>
                <span className="feature-desc">Access from any device</span>
              </div>
            </div>
          </div>
        </div>

        <div className="brand-geo">
          <span className="brand-circle" />
          <span className="brand-line bl-1" />
          <span className="brand-line bl-2" />
        </div>
      </div>

      <div className="auth-card">
        <div className="auth-card-glow" />

        <div className="auth-logo">
          <img src={logo} alt="BudgetBuddy" className="auth-logo-img" />
          <h1>BudgetBuddy</h1>
        </div>

        <div className="auth-heading">
          <h2 className="auth-title">Welcome Back</h2>
          <p className="auth-subtitle">Sign in to continue managing your finances</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className={`auth-input-group ${focusedField === "email" ? "focused" : ""} ${email ? "has-value" : ""}`}>
            <FiMail className="auth-input-icon" />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
              autoComplete="email"
              required
            />
            {email && <FiCheckCircle className="input-check" />}
          </div>

          <div className={`auth-input-group ${focusedField === "password" ? "focused" : ""} ${password ? "has-value" : ""}`}>
            <FiLock className="auth-input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setFocusedField("password")}
              onBlur={() => setFocusedField(null)}
              autoComplete="current-password"
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          <button type="submit" className="auth-btn primary" disabled={loading}>
            <span className="btn-content">
              {loading ? <span className="btn-spinner" /> : <FiLogIn />}
              {loading ? "Signing in..." : "Sign In"}
            </span>
            <span className="btn-shine" />
          </button>
        </form>

        <div className="auth-divider">
          <span />
          <small>secured by</small>
          <span />
        </div>

        <div className="auth-footer">
          <div className="auth-trust-badges">
            <div className="trust-badge">
              <FiShield />
              <span>Encrypted</span>
            </div>
            <div className="trust-badge">
              <FiCheckCircle />
              <span>Firebase Auth</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
