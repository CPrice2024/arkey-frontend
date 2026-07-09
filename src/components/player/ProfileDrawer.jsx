import React from "react";
import {
  X,
  Shield,
  ArrowDownToLine,
  ArrowUpFromLine,
  Clock,
  Gamepad2,
  Zap,
  Coins,
  Gift,
  User,
  Phone,
  AtSign,
  ChevronRight,
} from "lucide-react";

import "../../styles/profile.css";

export default function ProfileDrawer({
  player,
  balance,
  transactions = [],
  open,
  onClose,
  onDeposit,
  onWithdraw,
}) {
  if (!open) return null;

  return (
    <>
      {/* Overlay with blur */}
      <div className="drawer-overlay" onClick={onClose} />

      <div className="profile-drawer">
        {/* Header */}
        <div className="drawer-header">
          <div>
            <h2>
              <Gamepad2 size={18} strokeWidth={1.5} />
              Player Center
            </h2>
            <p>Manage your account</p>
          </div>
          <button className="drawer-close" onClick={onClose}>
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Player Card - Redesigned */}
        <div className="player-card">
          <div className="profile-user">
            <div className="profile-avatar">
              {player?.firstName?.charAt(0)?.toUpperCase() || "P"}
            </div>
            <div className="player-details">
              <h2>{player?.firstName} {player?.lastName}</h2>
              <p>
                <Phone size={12} strokeWidth={1.5} />
                {player?.phone}
              </p>
              <small>
                <AtSign size={10} strokeWidth={1.5} />
                {player?.username}
              </small>
            </div>
          </div>
          <div className="player-status">
            <span className="status-badge">
              <Zap size={10} strokeWidth={2} />
              Active
            </span>
          </div>
        </div>

        {/* Balance & Credit - Minimal */}
        <div className="balance-summary">
          <div className="balance-box">
            <div className="balance-icon">
              <Coins size={18} strokeWidth={1.5} />
            </div>
            <div>
              <p>Balance</p>
              <h2>{Number(balance).toFixed(2)} ETB</h2>
            </div>
          </div>
          <div className="credit-box">
            <div className="balance-icon">
              <Gift size={18} strokeWidth={1.5} />
            </div>
            <div>
              <p>Credit</p>
              <h2>0.00 ETB</h2>
            </div>
          </div>
        </div>

        {/* Quick Actions - Game Style */}
        <div className="quick-actions">
          <button onClick={onWithdraw} className="withdraw-btn">
            <ArrowUpFromLine size={16} strokeWidth={1.5} />
            Withdraw
          </button>
          <button onClick={onDeposit} className="deposit-btn">
            <ArrowDownToLine size={16} strokeWidth={1.5} />
            Deposit
          </button>
        </div>

        {/* Transactions - Clean */}
        <div className="transactions">
          <div className="section-header">
            <div>
              <h3>Recent Transactions</h3>
              <small>Latest deposits & withdrawals</small>
            </div>
            <ChevronRight size={16} strokeWidth={1.5} />
          </div>

          {transactions.length > 0 ? (
            transactions.slice(0, 5).map((item) => (
              <div key={item._id} className="transaction-item">
                <div className="transaction-info">
                  <strong>{item.type}</strong>
                  <small className={`status-${item.status?.toLowerCase()}`}>
                    {item.status}
                  </small>
                </div>
                <span className="transaction-amount">
                  {Number(item.amount).toLocaleString()} ETB
                </span>
              </div>
            ))
          ) : (
            <div className="empty-transactions">
              <Clock size={40} strokeWidth={1.5} />
              <h4>No Transactions Yet</h4>
              <p>Your deposits and withdrawals will appear here.</p>
            </div>
          )}
        </div>

        {/* Action Buttons - Game Concept */}
        <button className="view-all-btn">
          View All Transactions
          <ChevronRight size={14} strokeWidth={1.5} />
        </button>

        <button className="logout-player-btn">
          <Shield size={16} strokeWidth={1.5} />
          Security Settings
        </button>
      </div>
    </>
  );
}