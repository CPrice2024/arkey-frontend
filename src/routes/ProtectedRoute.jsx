import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  // Allow Telegram WebApp access
  if (
    window.Telegram &&
    window.Telegram.WebApp
  ) {
    return children;
  }

  // Not logged in
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // Role check
  if (role) {
    if (Array.isArray(role)) {
      if (!role.includes(user.role)) {
        return <Navigate to="/login" replace />;
      }
    } else {
      if (user.role !== role) {
        return <Navigate to="/login" replace />;
      }
    }
  }

  return children;
};

export default ProtectedRoute;