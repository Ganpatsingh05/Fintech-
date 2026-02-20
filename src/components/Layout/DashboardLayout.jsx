import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "./Layout.css";

export default function DashboardLayout({ children, floatingContent }) {
  return (
    <div className="dashboard-layout">
      <div className="layout-bg-decor">
        <span className="bg-ring br1" />
        <span className="bg-ring br2" />
        <span className="bg-ring br3" />
        <span className="bg-blob bb1" />
        <span className="bg-blob bb2" />
        <span className="bg-dash-line bdl1" />
        <span className="bg-dash-line bdl2" />
      </div>
      <Navbar />
      <main className="main-content">
        <div className="page-wrapper">{children}</div>
      </main>
      {floatingContent}
      <Footer />
    </div>
  );
}
