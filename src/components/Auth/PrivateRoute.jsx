// ==============================
// PrivateRoute — Protected Route Wrapper
// ==============================
// Redirects unauthenticated users to the login page.
// Shows a loading spinner while checking auth state.

import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function PrivateRoute({ children }) {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}>
        <div className="loading-spinner" />
      </div>
    );
  }

  return currentUser ? children : <Navigate to="/login" replace />;
}
