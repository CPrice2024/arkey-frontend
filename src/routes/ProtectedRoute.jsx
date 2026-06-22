import { Navigate } from "react-router-dom";

const ProtectedRoute = ({
  children,
  role
}) => {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  if (
    window.Telegram &&
    window.Telegram.WebApp
  ) {
    return children;
  }

  if (!user) {
    return (
      <Navigate to="/login" />
    );
  }

  if (role) {

    if (Array.isArray(role)) {

      if (
        !role.includes(user.role)
      ) {
        return (
          <Navigate to="/" />
        );
      }

    } else {

      if (
        user.role !== role
      ) {
        return (
          <Navigate to="/" />
        );
      }

    }
  }

  return children;
};

export default ProtectedRoute;