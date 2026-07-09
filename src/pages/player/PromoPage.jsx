import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Gift,
  Sparkles,
  Trophy,
  Zap,
  Percent,
  Crown,
  Clock,
  ChevronRight,
  Users,
  Bot,
} from "lucide-react";

import PromoCard from "../../components/player/PromoCard";
import CouponModal from "../../components/player/CouponModal";
import "../../styles/promoPage.css"; // New separate CSS file

export default function PromoPage() {
  const [showCoupon, setShowCoupon] = useState(false);
  const navigate = useNavigate();

  const promos = [
    {
      id: 1,
      title: "Welcome Bonus",
      bonus: "100%",
      description: "Get 100% on your first deposit. New players only.",
      color: "#00d48a",
      icon: Gift,
      type: "welcome",
      progress: 100,
      users: 234,
    },
    {
      id: 2,
      title: "Weekend Cashback",
      bonus: "15%",
      description: "Receive cashback every Sunday. Maximum 500 ETB.",
      color: "#0ea5e9",
      icon: Percent,
      type: "cashback",
      progress: 67,
      users: 89,
    },
    {
      id: 3,
      title: "VIP Rewards",
      bonus: "VIP",
      description: "Exclusive rewards for active players. Level up today!",
      color: "#ffb000",
      icon: Crown,
      type: "vip",
      progress: 45,
      users: 56,
    },
  ];

  return (
    <div className="promo-page">
      {/* Header */}
      <div className="promo-header">
        <button
          className="promo-back-btn"
          onClick={() => navigate("/game")}
        >
          <ArrowLeft size={20} strokeWidth={1.5} />
        </button>
        <div>
          <h1>
            <Sparkles size={18} strokeWidth={1.5} />
            Promotions
          </h1>
          <p>Exclusive offers for Arkey players</p>
        </div>
        <div className="promo-header-spacer"></div>
        <div className="telegram-status">
          <span className="status-dot"></span>
          <span>@ArkeyBot</span>
        </div>
      </div>

      {/* Telegram Bot Indicator */}
      <div className="telegram-bot-indicator">
        <div className="bot-avatar">A</div>
        <div className="bot-info">
          <div className="bot-name">Arkey Gaming Bot</div>
          <div className="bot-status">Online · 1.2k active users</div>
        </div>
        <span className="bot-status-dot"></span>
      </div>

      {/* Stats */}
      <div className="promo-stats">
        <div className="stat-item">
          <Zap size={14} strokeWidth={1.5} />
          <span className="stat-number">{promos.length}</span>
          <span>Active Promotions</span>
        </div>
        <div className="stat-item">
          <Clock size={14} strokeWidth={1.5} />
          <span>Check back daily</span>
        </div>
        <div className="stat-item">
          <Users size={14} strokeWidth={1.5} />
          <span className="stat-number">379</span>
          <span>Players claimed</span>
        </div>
      </div>

      {/* Coupon Button */}
      <button
        className="coupon-button"
        onClick={() => setShowCoupon(true)}
      >
        <span className="button-glow"></span>
        <Gift size={16} strokeWidth={1.5} />
        Redeem Coupon
        <ChevronRight size={14} strokeWidth={1.5} />
      </button>

      {/* Promo List */}
      <div className="promo-list">
        {promos.map((promo) => (
          <PromoCard
            key={promo.id}
            promo={promo}
          />
        ))}
      </div>

      {/* Social Proof */}
      <div className="social-proof">
        <div className="avatar-group">
          <div className="avatar">JD</div>
          <div className="avatar">MK</div>
          <div className="avatar">AL</div>
          <div className="avatar">+7</div>
        </div>
        <div className="proof-text">
          <strong>379 players</strong> have claimed promotions this week
        </div>
      </div>

      {/* Coupon Modal */}
      <CouponModal
        open={showCoupon}
        onClose={() => setShowCoupon(false)}
      />
    </div>
  );
}