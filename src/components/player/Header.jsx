import React, { useState } from "react";
import {
  Wallet,
  Eye,
  EyeOff,
  RotateCw,
  Plus,
  User,
} from "lucide-react";
import "../../styles/header.css";

import logo from "../../assets/logo6.png";

export default function Header({
  player,
  balance,
  onRefresh,
  onDeposit,
}) {
  const [showBalance, setShowBalance] = useState(false);

  return (
    <header className="game-header">

      {/* LEFT - Logo */}
      <div className="header-left">
        <img
          src={logo}
          alt="Arkey Bet"
          className="header-logo"
        />
        <span className="header-brand">Arkey Games</span>
      </div>

      {/* CENTER - Balance */}
      <div className="header-center">
        <div className="balance-box">
          <button
            className="refresh-btn"
            onClick={onRefresh}
            title="Refresh balance"
          >
            <RotateCw size={18} strokeWidth={1.5} />
          </button>

          <Wallet size={16} strokeWidth={1.5} className="wallet-icon" />

          <span className="balance-amount">
            {showBalance
              ? `${Number(balance).toLocaleString()} ETB`
              : "••••••••"}
          </span>

          <button
            className="eye-btn"
            onClick={() => setShowBalance(!showBalance)}
            title={showBalance ? "Hide balance" : "Show balance"}
          >
            {showBalance ? (
              <EyeOff size={16} strokeWidth={1.5} />
            ) : (
              <Eye size={16} strokeWidth={1.5} />
            )}
          </button>
        </div>
      </div>

      {/* RIGHT - Actions */}
      <div className="header-right">
        {/* Player Indicator */}
        {player && (
          <div className="player-indicator">
            <User size={14} strokeWidth={1.5} />
            <span>{player?.firstName || "Player"}</span>
          </div>
        )}

        <button
          className="deposit-btn"
          onClick={onDeposit}
        >
          <Plus size={16} strokeWidth={1.5} />
          Deposit
        </button>
      </div>

    </header>
  );
}