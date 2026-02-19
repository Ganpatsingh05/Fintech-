import { FiHeart } from "react-icons/fi";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="app-footer">
      <p>
        Made with <FiHeart className="footer-heart" /> &copy;{" "}
        {new Date().getFullYear()} Personal Finance Tracker
      </p>
    </footer>
  );
}
