import React, { useState } from "react";
import { NavLink, useNavigate, Outlet } from "react-router-dom";

import {
  LayoutDashboard,
  Users,
  Gift,

  BanknoteArrowDown, 
  BanknoteArrowUp,   

  ChevronLeft,
  ChevronRight,
  Gamepad2,
  LogOut,
} from "lucide-react";

import "../styles/LayoutStyles.css";

function Layout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const navigate = useNavigate();
  const user = JSON.parse(
  localStorage.getItem("user")
);

const role = user?.role;

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    sessionStorage.clear();

    navigate("/login");

    setShowLogoutConfirm(false);
  };

  return (
    <div className="layout-container">

      {/* SIDEBAR */}
      <div
        className={`sidebar ${
          isSidebarCollapsed ? "collapsed" : "expanded"
        }`}
      >
        <div className="sidebar-content">

          <div className="sidebar-top">

            <div className="logo-container">
              <div className="logo-wrapper">
                <Gamepad2
                  size={isSidebarCollapsed ? 24 : 28}
                  className="logo-icon"
                />

                {!isSidebarCollapsed && (
                  <h2 className="logo">
  {user?.firstName || user?.username || "Arkey Bet"}
</h2>
                )}
              </div>

              <button
                onClick={toggleSidebar}
                className="toggle-btn"
              >
                {isSidebarCollapsed ? (
                  <ChevronRight size={18} />
                ) : (
                  <ChevronLeft size={18} />
                )}
              </button>
            </div>

            <nav className="sidebar-nav">
              {role !== "player" && (
  <NavLink
    to="/dashboard"
    end
    className={({ isActive }) =>
      `nav-link ${isActive ? "active" : ""}`
    }
  >
    <LayoutDashboard
      size={20}
      className="nav-icon"
    />

    {!isSidebarCollapsed && (
      <span>Dashboard</span>
    )}
  </NavLink>
)}

              {role === "admin" && (
  <NavLink
    to="/dashboard/users"
    className={({ isActive }) =>
      `nav-link ${isActive ? "active" : ""}`
    }
  >
    <Users
      size={20}
      className="nav-icon"
    />

    {!isSidebarCollapsed && (
      <span>Users</span>
    )}
  </NavLink>
)}


              {role === "admin" && (
  <NavLink
    to="/dashboard/promotions"
    className={({ isActive }) =>
      `nav-link ${isActive ? "active" : ""}`
    }
  >
    <Gift
      size={20}
      className="nav-icon"
    />

    {!isSidebarCollapsed && (
      <span>Promotions</span>
    )}
  </NavLink>
)}
{["admin", "agent"].includes(role) && (
  <NavLink
    to="/dashboard/deposits"
    className={({ isActive }) =>
      `nav-link ${isActive ? "active" : ""}`
    }
  >
    <BanknoteArrowDown
      size={20}
      className="nav-icon"
    />

    {!isSidebarCollapsed && (
      <span>Deposits</span>
    )}
  </NavLink>
)}
{["admin", "agent"].includes(role) && (
  <NavLink
    to="/dashboard/withdrawals"
    className={({ isActive }) =>
      `nav-link ${isActive ? "active" : ""}`
    }
  >
    <BanknoteArrowUp
      size={20}
      className="nav-icon"
    />

    {!isSidebarCollapsed && (
      <span>Withdrawals</span>
    )}
  </NavLink>
)}

{role === "player" && (
  <NavLink
    to="/game"
    className={({ isActive }) =>
      `nav-link ${isActive ? "active" : ""}`
    }
  >
    <Gamepad2
      size={20}
      className="nav-icon"
    />

    {!isSidebarCollapsed && (
      <span>Game Lobby</span>
    )}
  </NavLink>
)}

            </nav>
          </div>

          <div className="sidebar-bottom">
            <button
              onClick={() => setShowLogoutConfirm(true)}
              className="logout-btn"
            >
              <LogOut size={20} className="logout-icon" />

              {!isSidebarCollapsed && (
                <span>Logout</span>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* CONTENT */}
      <div
        className={`main-content ${
          isSidebarCollapsed ? "collapsed" : "expanded"
        }`}
      >
        <div className="content-wrapper">
          <Outlet />
        </div>
      </div>

      {/* LOGOUT MODAL */}
      {showLogoutConfirm && (
        <div
          className="logout-confirm-overlay"
          onClick={() => setShowLogoutConfirm(false)}
        >
          <div
            className="logout-confirm-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Confirm Logout</h3>

            <p>
              Are you sure you want to logout?
            </p>

            <div className="logout-confirm-actions">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="logout-confirm-btn cancel"
              >
                Cancel
              </button>

              <button
                onClick={handleLogout}
                className="logout-confirm-btn confirm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Layout;