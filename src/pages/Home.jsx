import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FiArrowRight,
  FiShield,
  FiTrendingUp,
  FiPieChart,
  FiZap,
  FiSmartphone,
  FiLock,
  FiCheckCircle,
  FiBarChart2,
  FiDollarSign,
  FiClock,
  FiHeart,
  FiGithub,
  FiTwitter,
  FiMail,
} from "react-icons/fi";
import logo from "../assets/finTracklogo (2).png";
import "./Home.css";

const features = [
  {
    icon: <FiTrendingUp />,
    title: "Real-Time Tracking",
    desc: "Monitor income & expenses as they happen with live sync across devices.",
  },
  {
    icon: <FiPieChart />,
    title: "Smart Analytics",
    desc: "Beautiful interactive charts that reveal spending patterns & insights.",
  },
  {
    icon: <FiShield />,
    title: "Bank-Grade Security",
    desc: "Firebase encrypted storage keeps your financial data safe & private.",
  },
  {
    icon: <FiZap />,
    title: "Lightning Fast",
    desc: "Optimised performance — add transactions in seconds, not minutes.",
  },
  {
    icon: <FiSmartphone />,
    title: "Works Everywhere",
    desc: "Fully responsive design that looks stunning on any screen size.",
  },
  {
    icon: <FiLock />,
    title: "Private by Default",
    desc: "Your data stays yours. No ads, no trackers, no data selling.",
  },
];



export default function Home() {
  const { currentUser } = useAuth();

  return (
    <div className="home-page">
      {/* Navigation */}
      <nav className="home-nav">
        <div className="home-nav-inner">
          <Link to="/" className="home-logo">
            <img src={logo} alt="BudgetBuddy" className="home-logo-img" />
            <span className="home-logo-text">BudgetBuddy</span>
          </Link>
          <div className="home-nav-actions">
            {currentUser ? (
              <Link to="/dashboard" className="home-btn home-btn-primary">
                Go to Dashboard <FiArrowRight />
              </Link>
            ) : (
              <>
                <Link to="/login" className="home-btn home-btn-ghost">
                  Sign In
                </Link>
                <Link to="/login?mode=signup" className="home-btn home-btn-primary">
                  Get Started Free <FiArrowRight />
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-gradient-orb orb-1" />
          <div className="hero-gradient-orb orb-2" />
          <div className="hero-gradient-orb orb-3" />
          <div className="hero-grid" />
        </div>

        <div className="hero-content">
          <div className="hero-badge">
            <FiZap className="badge-icon" />
            <span>Smart Finance Management</span>
          </div>

          <h1 className="hero-title">
            Take Control of Your
            <span className="hero-title-accent"> Finances</span>
            <br />
            with Confidence
          </h1>

          <p className="hero-subtitle">
            Track every rupee, visualize spending patterns, and make smarter
            financial decisions — all in one beautiful, secure dashboard.
          </p>

          <div className="hero-cta">
            <Link
              to={currentUser ? "/dashboard" : "/login?mode=signup"}
              className="home-btn home-btn-primary home-btn-lg"
            >
              {currentUser ? "Open Dashboard" : "Start Free Today"}
              <FiArrowRight />
            </Link>
            <Link to="/login" className="home-btn home-btn-outline home-btn-lg">
              <FiBarChart2 />
              See How It Works
            </Link>
          </div>

          <div className="hero-trust">
            <div className="trust-avatars">
              <span className="trust-avatar" style={{ background: "#2563eb" }}>S</span>
              <span className="trust-avatar" style={{ background: "#7c3aed" }}>A</span>
              <span className="trust-avatar" style={{ background: "#059669" }}>R</span>
              <span className="trust-avatar" style={{ background: "#dc2626" }}>M</span>
              <span className="trust-avatar trust-avatar-count">+2K</span>
            </div>
            <p className="trust-text">
              Trusted by <strong>2,000+</strong> users to manage their finances
            </p>
          </div>
        </div>

        {/* Hero Visual Card */}
        <div className="hero-visual">
          <div className="hero-card-stack">
            <div className="hero-mock-card mock-balance">
              <div className="mock-card-header">
                <div className="mock-chip"><FiDollarSign /></div>
                <span className="mock-badge">Net Balance</span>
              </div>
              <h3 className="mock-amount">₹1,24,500</h3>
              <div className="mock-stats">
                <span className="mock-stat up"><FiTrendingUp /> ₹2,15,000</span>
                <span className="mock-stat down">₹90,500</span>
              </div>
            </div>
            <div className="hero-mock-card mock-transaction">
              <div className="mock-tx-row">
                <div className="mock-tx-icon income"><FiTrendingUp /></div>
                <div className="mock-tx-info">
                  <span className="mock-tx-title">Salary Credited</span>
                  <span className="mock-tx-date">Today, 9:30 AM</span>
                </div>
                <span className="mock-tx-amount up">+₹85,000</span>
              </div>
              <div className="mock-tx-row">
                <div className="mock-tx-icon expense"><FiTrendingUp style={{ transform: "rotate(180deg)" }} /></div>
                <div className="mock-tx-info">
                  <span className="mock-tx-title">Grocery Shopping</span>
                  <span className="mock-tx-date">Yesterday</span>
                </div>
                <span className="mock-tx-amount down">-₹2,340</span>
              </div>
            </div>
            <div className="hero-float-badge badge-secure">
              <FiShield /> Encrypted
            </div>
            <div className="hero-float-badge badge-sync">
              <FiClock /> Real-time
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" id="features">
        <div className="features-inner">
          <div className="section-label">
            <FiCheckCircle /> Features
          </div>
          <h2 className="section-title">
            Everything You Need to
            <span className="text-accent"> Master Your Money</span>
          </h2>
          <p className="section-desc">
            Powerful tools wrapped in a beautiful interface — designed to make
            personal finance effortless.
          </p>

          <div className="features-grid">
            {features.map((f, i) => (
              <div className="feature-card" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="feature-icon-box">{f.icon}</div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-inner">
          <div className="cta-glow" />
          <h2 className="cta-title">Ready to Take Control?</h2>
          <p className="cta-desc">
            Join thousands of users who are already managing their finances
            smarter with BudgetBuddy.
          </p>
          <Link
            to={currentUser ? "/dashboard" : "/login?mode=signup"}
            className="home-btn home-btn-primary home-btn-lg cta-btn"
          >
            {currentUser ? "Go to Dashboard" : "Get Started — It's Free"}
            <FiArrowRight />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="home-footer-inner">
          <div className="footer-top">
            <div className="footer-brand-col">
              <div className="home-footer-brand">
                <img src={logo} alt="BudgetBuddy" className="footer-logo-img" />
                <span>BudgetBuddy</span>
              </div>
              <p className="footer-tagline">
                Smart, secure & beautiful personal finance tracking. Take control of every rupee.
              </p>
            </div>

            <div className="footer-links-col">
              <h4 className="footer-col-title">Product</h4>
              <Link to="/#features" className="footer-link">Features</Link>
              <Link to="/login?mode=signup" className="footer-link">Get Started</Link>
              <Link to="/login" className="footer-link">Sign In</Link>
            </div>

            <div className="footer-links-col">
              <h4 className="footer-col-title">Resources</h4>
              <a href="#" className="footer-link">Documentation</a>
              <a href="#" className="footer-link">Privacy Policy</a>
              <a href="#" className="footer-link">Terms of Service</a>
            </div>

            <div className="footer-links-col">
              <h4 className="footer-col-title">Connect</h4>
              <div className="footer-socials">
                <a href="#" className="footer-social-btn" aria-label="GitHub"><FiGithub /></a>
                <a href="#" className="footer-social-btn" aria-label="Twitter"><FiTwitter /></a>
                <a href="#" className="footer-social-btn" aria-label="Email"><FiMail /></a>
              </div>
            </div>
          </div>

          <div className="footer-divider" />

          <div className="footer-bottom">
            <p className="home-footer-copy">
              © {new Date().getFullYear()} BudgetBuddy. All rights reserved.
            </p>
            <p className="footer-made-with">
              Made with <FiHeart className="footer-heart-icon" /> in India
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
