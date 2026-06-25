import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const location = useLocation();

  const isTelegram =
    window.Telegram &&
    window.Telegram.WebApp &&
    window.Telegram.WebApp.initData &&
    window.Telegram.WebApp.initData.length > 0;

  // Only allow Telegram to bypass auth for the game
  if (isTelegram && location.pathname === "/game") {
    return children;
  }

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

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