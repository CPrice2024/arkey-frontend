import React from "react";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Layout from "./components/Layout";

import ProtectedRoute from "./routes/ProtectedRoute"

import LoginPage from "./pages/LoginPage";

import DashboardPage from "./pages/admin/DashboardPage";
import UsersPage from "./pages/admin/UsersPage";
import PromotionsPage from "./pages/admin/PromotionsPage";
import DepositsPage from "./pages/admin/DepositsPage";
import WithdrawalPage from "./pages/admin/WithdrawalPage";


import GameLobbyPage from "./pages/player/GameLobbypage";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* LOGIN */}
        <Route
          path="/login"
          element={<LoginPage />}
        />

        {/* MAIN LAYOUT */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >

          {/* DASHBOARD */}
          <Route
  index
  element={
    <ProtectedRoute
      role={["admin", "agent"]}
    >
      <DashboardPage />
    </ProtectedRoute>
  }
/>

          {/* USERS - ADMIN ONLY */}
          <Route
            path="users"
            element={
              <ProtectedRoute
                role="admin"
              >
                <UsersPage />
              </ProtectedRoute>
            }
          />

          {/* PROMOTIONS - ADMIN ONLY */}
          <Route
            path="promotions"
            element={
              <ProtectedRoute
                role="admin"
              >
                <PromotionsPage />
              </ProtectedRoute>
            }
          />

          {/* DEPOSITS - ADMIN + AGENT */}
          <Route
            path="deposits"
            element={
              <ProtectedRoute
                role={[
                  "admin",
                  "agent"
                ]}
              >
                <DepositsPage />
              </ProtectedRoute>
            }
          />

          {/* WITHDRAWALS - ADMIN + AGENT */}
          <Route
            path="withdrawals"
            element={
              <ProtectedRoute
                role={[
                  "admin",
                  "agent"
                ]}
              >
                <WithdrawalPage />
              </ProtectedRoute>
            }
          />

          {/* GAME LOBBY - PLAYER ONLY */}
        

        </Route>
        <Route
  path="/game"
  element={<GameLobbyPage />}
/>

      </Routes>

    </BrowserRouter>
  );
}

export default App;