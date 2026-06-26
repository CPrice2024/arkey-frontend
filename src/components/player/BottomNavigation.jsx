import React from "react";
import {
  Gift,
  Headset,
  User,
  Home,
  Plus,
} from "lucide-react";

export default function BottomNavigation({
  onHome,
  onPromo,
  onSupport,
  onProfile,
  onDeposit,
}) {
  return (
    <nav className="bottom-navigation">

      <button
        className="bottom-nav-item active"
        onClick={onHome}
      >
        <Home size={22} />
        <span>Home</span>
      </button>

      <button
        className="bottom-nav-item"
        onClick={onPromo}
      >
        <Gift size={22} />
        <span>Promo</span>
      </button>

      {/* Floating Center Button */}
      <button
        className="deposit-floating-btn"
        onClick={onDeposit}
      >
        <Plus size={28} />
      </button>

      <button
        className="bottom-nav-item"
        onClick={onSupport}
      >
        <Headset size={22} />
        <span>Support</span>
      </button>

      <button
        className="bottom-nav-item"
        onClick={onProfile}
      >
        <User size={22} />
        <span>Profile</span>
      </button>

    </nav>
  );
}