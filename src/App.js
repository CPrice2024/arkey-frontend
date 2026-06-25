import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Layout from "./components/Layout";
import ProtectedRoute from "./routes/ProtectedRoute";

import LoginPage from "./pages/LoginPage";

import DashboardPage from "./pages/admin/DashboardPage";
import UsersPage from "./pages/admin/UsersPage";
import PromotionsPage from "./pages/admin/PromotionsPage";
import DepositsPage from "./pages/admin/DepositsPage";
import WithdrawalPage from "./pages/admin/WithdrawalPage";
import GameLobbyPage from "./pages/player/GameLobbypage";

function App() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN */}
        <Route
          path="/login"
          element={
            token ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <LoginPage />
            )
          }
        />

        {/* ADMIN / AGENT */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={
              <ProtectedRoute role={["admin", "agent"]}>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="users"
            element={
              <ProtectedRoute role="admin">
                <UsersPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="promotions"
            element={
              <ProtectedRoute role="admin">
                <PromotionsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="deposits"
            element={
              <ProtectedRoute role={["admin", "agent"]}>
                <DepositsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="withdrawals"
            element={
              <ProtectedRoute role={["admin", "agent"]}>
                <WithdrawalPage />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* PLAYER */}
        <Route
          path="/game"
          element={
            <ProtectedRoute role="player">
              <GameLobbyPage />
            </ProtectedRoute>
          }
        />

        {/* UNKNOWN ROUTES */}
        <Route
          path="*"
          element={
            <Navigate
              to={token ? "/dashboard" : "/login"}
              replace
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;