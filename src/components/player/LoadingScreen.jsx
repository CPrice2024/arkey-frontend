import React from "react";
import {
  Gamepad2,
  LoaderCircle,
  ShieldCheck,
  Zap,
} from "lucide-react";

import logo from "../../assets/logo6.png";
import "../../styles/loading.css"; // Fixed import path

export default function LoadingScreen() {
  return (
    <div className="loading-page">

      {/* Minimalist Animated Background */}
      <div className="loading-bg">
        <div className="grid-overlay"></div>
        <div className="pulse-ring"></div>
      </div>

      <div className="loading-card">

        {/* Logo - Clean & Centered */}
        <div className="loading-logo">
          <img src={logo} alt="Arkey Bet" />
          <div className="logo-glow"></div>
        </div>

        {/* Title - Minimal */}
        <div className="loading-title">
          <Gamepad2 size={24} strokeWidth={1.5} />
          <h1>Arkey Games</h1>
        </div>

        {/* Status Text - Clean */}
        <p className="loading-text">
          loading world...
        </p>

        {/* Progress Bar - Minimalist */}
        <div className="loading-progress">
          <div className="loading-bar"></div>
          <span className="progress-percent">78%</span>
        </div>

        {/* Status - With subtle animation */}
        <div className="loading-status">
          <LoaderCircle className="loading-spinner" size={16} strokeWidth={1.5} />
          <span>preloading assets</span>
          <span className="status-dots">
            <span>.</span><span>.</span><span>.</span>
          </span>
        </div>

        {/* Security - Minimal */}
        <div className="loading-security">
          <ShieldCheck size={14} strokeWidth={1.5} />
          <span>secure connection</span>
        </div>

        {/* Game Concept Hint - New Element */}
        <div className="loading-hint">
          <Zap size={12} strokeWidth={1.5} />
          <span>v1.0.2 · ready</span>
        </div>

      </div>

    </div>
  );
}