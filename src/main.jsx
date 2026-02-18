// ==============================
// main.jsx — Entry Point of the App
// ==============================
// This is the very first file React loads.
// It wraps our <App /> inside BrowserRouter (for routing)
// and renders everything into the #root div in index.html.

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // Enables client-side routing
import App from "./App.jsx";
import "./index.css"; // Global styles

// Render the app into the DOM
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* BrowserRouter wraps the entire app so we can use <Routes>, <Link>, etc. */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
