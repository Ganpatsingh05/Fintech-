// ==============================
// App.jsx — Root Component
// ==============================
// Route definitions, global context providers, and toast notifications.

import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Context Providers
import { ThemeProvider } from "./context/ThemeContext";

// Pages
import Dashboard from "./pages/Dashboard";
import AddTransaction from "./pages/AddTransaction";

function App() {
  return (
    <ThemeProvider>
      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        theme="colored"
      />

      {/* App Routes */}
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-transaction" element={<AddTransaction />} />

        {/* Redirect root to dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
