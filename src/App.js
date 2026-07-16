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
import Game from "./pages/player/Game";
import PromoPage from "./pages/player/PromoPage";

import PlayerDeposit from "./pages/player/PlayerDeposit";
import PlayerWithdrawal from "./pages/player/PlayerWithdrawal";

function App() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN */}
        <Route
          path="/*"
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
        element={<Game />}
        />
        <Route
        path="/promotions"
        element={<PromoPage />}/>

        <Route
          path="*"
          element={
            <Navigate
              to={token ? "/" : "/"}
              replace
            />
          }
        />
        <Route
        path="/PlayerDeposit"
        element={<PlayerDeposit />}/>

        <Route
        path="/PlayerWithdrawal"
        element={<PlayerWithdrawal />}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;