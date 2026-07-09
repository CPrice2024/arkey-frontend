import React, { useState, useEffect } from "react";
import {
  Gamepad2,
  LoaderCircle,
  ShieldCheck,
  Zap,
  Users,
  Wifi,
} from "lucide-react";

import logo from "../../assets/logo6.png";
import "../../styles/loading.css";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + Math.random() * 4 + 1;
        return next > 100 ? 100 : next;
      });
    }, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-page">
      <div className="loading-bg">
        <div className="grid-overlay"></div>
        <div className="pulse-ring"></div>
      </div>

      <div className="loading-card">
        {/* Logo */}
        <div className="loading-logo">
          <img src={logo} alt="Arkey Bet" />
          <div className="logo-glow"></div>
        </div>

        {/* Title */}
        <div className="loading-title">
          <Gamepad2 size={20} strokeWidth={1.5} />
          <h1>Arkey Games</h1>
        </div>

        {/* Status */}
        <p className="loading-text">loading game...</p>

        {/* Progress */}
        <div className="loading-progress">
          <div className="loading-bar"></div>
          <span className="progress-percent">{Math.round(progress)}%</span>
        </div>

        {/* Status */}
        <div className="loading-status">
          <LoaderCircle className="loading-spinner" size={14} strokeWidth={1.5} />
          <span>preloading assets</span>
          <span className="status-dots">
            <span>.</span><span>.</span><span>.</span>
          </span>
        </div>

        {/* Metrics - Minimal */}
        <div className="loading-metrics">
          <div className="metric">
            <Users size={10} strokeWidth={1.5} />
            <span>1.2k</span>
          </div>
          <div className="metric">
            <Wifi size={10} strokeWidth={1.5} />
            <span>online</span>
          </div>
        </div>

        {/* Security */}
        <div className="loading-security">
          <ShieldCheck size={10} strokeWidth={1.5} />
          <span>secure</span>
        </div>

        {/* Telegram Status */}
        <div className="telegram-status">
          <span className="dot"></span>
          <span>@ArkeyBot</span>
        </div>

        {/* Version */}
        <div className="loading-hint">
          <Zap size={8} strokeWidth={1.5} />
          <span>v2.1.4</span>
        </div>

        {/* Tip */}
        <div className="loading-tip">
          💡 daily rewards available
        </div>
      </div>
    </div>
  );
}