// ==============================
// DashboardLayout — Wrapper with Navbar
// ==============================
// Wraps pages with the Navbar and provides consistent padding.

import Navbar from "../Navbar/Navbar";
import "./Layout.css";

export default function DashboardLayout({ children, floatingContent }) {
  return (
    <div className="dashboard-layout">
      <Navbar />
      <main className="main-content">
        <div className="page-wrapper">{children}</div>
      </main>
      {/* Rendered outside page-wrapper so fixed positioning works */}
      {floatingContent}
    </div>
  );
}
