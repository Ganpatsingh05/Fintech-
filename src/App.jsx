// ==============================
// App.jsx — Root Component
// ==============================
// Route definitions, global context providers, and toast notifications.

import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Context Providers
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";

// Auth
import PrivateRoute from "./components/Auth/PrivateRoute";

// Pages
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import AddTransaction from "./pages/AddTransaction";
import Login from "./pages/Login";

function App() {
  return (
    <AuthProvider>
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
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/add-transaction"
            element={
              <PrivateRoute>
                <AddTransaction />
              </PrivateRoute>
            }
          />

          {/* Redirect unknown to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
