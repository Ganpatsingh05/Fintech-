import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import {
  FiMail, FiLock, FiLogIn, FiEye, FiEyeOff, FiShield,
  FiUser, FiArrowRight, FiCheckCircle,
} from "react-icons/fi";
import logo from "../assets/finTracklogo (2).png";
import "./Auth.css";

export default function Login() {
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get("mode") === "signup" ? "signup" : "login";

  const [mode, setMode] = useState(initialMode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const isSignup = mode === "signup";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || (isSignup && !name)) {
      toast.error("Please fill in all fields");
      return;
    }
    if (isSignup && password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    try {
      if (isSignup) {
        await signup(email, password, name);
        toast.success("Account created! Welcome aboard!");
      } else {
        await login(email, password);
        toast.success("Welcome back!");
      }
      navigate("/dashboard");
    } catch (err) {
      const msg =
        err.code === "auth/email-already-in-use"
          ? "Email already in use. Try signing in."
          : err.code === "auth/user-not-found" || err.code === "auth/wrong-password"
          ? "Invalid email or password"
          : err.code === "auth/invalid-credential"
          ? "Invalid email or password"
          : err.code === "auth/too-many-requests"
          ? "Too many attempts. Try again later"
          : err.code === "auth/weak-password"
          ? "Password is too weak"
          : isSignup ? "Signup failed. Please try again" : "Login failed. Please try again";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-bg">
        <div className="auth-orb orb-a" />
        <div className="auth-orb orb-b" />
        <div className="auth-grid-bg" />
      </div>

      <Link to="/" className="auth-back-home">
        <FiArrowRight style={{ transform: "rotate(180deg)" }} />
        <span>Home</span>
      </Link>

      <div className="auth-container">
        <div className="auth-brand-panel">
          <div className="brand-content">
            <div className="brand-logo-mark">
              <img src={logo} alt="BudgetBuddy" className="brand-logo-img" />
            </div>
            <h1 className="brand-name">BudgetBuddy</h1>
            <p className="brand-tagline">Your smart companion for smarter spending</p>

            <div className="brand-features">
              <div className="brand-feature-item">
                <FiCheckCircle className="bf-icon" />
                <span>Track income & expenses in real-time</span>
              </div>
              <div className="brand-feature-item">
                <FiCheckCircle className="bf-icon" />
                <span>Beautiful charts & analytics</span>
              </div>
              <div className="brand-feature-item">
                <FiCheckCircle className="bf-icon" />
                <span>Bank-grade Firebase security</span>
              </div>
              <div className="brand-feature-item">
                <FiCheckCircle className="bf-icon" />
                <span>Access from any device, anywhere</span>
              </div>
            </div>
          </div>
        </div>

        <div className="auth-card">
          <div className="auth-card-inner">
            <div className="auth-logo-mobile">
              <img src={logo} alt="BudgetBuddy" className="auth-logo-img" />
              <span>BudgetBuddy</span>
            </div>

            <div className="auth-heading">
              <h2 className="auth-title">
                {isSignup ? "Create Account" : "Welcome Back"}
              </h2>
              <p className="auth-subtitle">
                {isSignup
                  ? "Start your journey to financial clarity"
                  : "Sign in to manage your finances"}
              </p>
            </div>

            <form className="auth-form" onSubmit={handleSubmit}>
              {isSignup && (
                <div className={`auth-input-group ${focusedField === "name" ? "focused" : ""} ${name ? "has-value" : ""}`}>
                  <FiUser className="auth-input-icon" />
                  <input
                    type="text"
                    placeholder="Full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    autoComplete="name"
                  />
                </div>
              )}

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
              </div>

              <div className={`auth-input-group ${focusedField === "password" ? "focused" : ""} ${password ? "has-value" : ""}`}>
                <FiLock className="auth-input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder={isSignup ? "Create password (min 6 chars)" : "Password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  autoComplete={isSignup ? "new-password" : "current-password"}
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
                  {loading ? (isSignup ? "Creating..." : "Signing in...") : (isSignup ? "Create Account" : "Sign In")}
                </span>
              </button>
            </form>

            <div className="auth-switch">
              <p>
                {isSignup ? "Already have an account?" : "Don't have an account?"}
                <button
                  type="button"
                  className="auth-switch-btn"
                  onClick={() => setMode(isSignup ? "login" : "signup")}
                >
                  {isSignup ? "Sign In" : "Create Account"}
                </button>
              </p>
            </div>

            <div className="auth-footer-trust">
              <FiShield className="trust-icon" />
              <span>Secured by Firebase Authentication</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
