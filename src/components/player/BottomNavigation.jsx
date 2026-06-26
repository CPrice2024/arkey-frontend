import React from "react";
import {
  Gift,
  Headset,
  User,
  Plus,
} from "lucide-react";

export default function BottomNavigation({
  onPromo,
  onSupport,
  onProfile,
  onDeposit,
}) {
  return (
    <div className="bottom-navigation">

      <button
        className="bottom-nav-item"
        onClick={onPromo}
      >
        <Gift size={22} />
        <span>Promo</span>
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

      <button
        className="deposit-floating-btn"
        onClick={onDeposit}
      >
        <Plus size={24} />
        <span>Deposit</span>
      </button>

    </div>
  );
}