import React, { useState, useEffect } from "react";
import {
  Gamepad2,
  LoaderCircle,
  ShieldCheck,
  Zap,
  Users,
  Wifi,
  Award,
} from "lucide-react";

import logo from "../../assets/logo6.png";
import "../../styles/loading.css";

const messages = [
  { progress: 10, text: "initializing game engine..." },
  { progress: 25, text: "loading assets..." },
  { progress: 45, text: "connecting to servers..." },
  { progress: 65, text: "syncing player data..." },
  { progress: 85, text: "preparing game world..." },
  { progress: 95, text: "almost ready..." },
];

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState("initializing");

  useEffect(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 5 + 1;
      if (currentProgress > 100) {
        currentProgress = 100;
        clearInterval(interval);
      }
      setProgress(Math.min(currentProgress, 100));
      
      // Update status message based on progress
      const currentMessage = messages.find(
        (msg) => currentProgress <= msg.progress + 10
      );
      if (currentMessage) {
        setStatusMessage(currentMessage.text);
      }
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-page">
      {/* Animated Background */}
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
          <Gamepad2 size={24} strokeWidth={1.5} />
          <h1>Arkey Games</h1>
        </div>

        {/* Telegram Gaming Badge */}
        <div className="telegram-gaming-badge">
          <Zap size={10} strokeWidth={1.5} />
          Telegram Gaming
        </div>

        {/* Status Text with Dynamic Message */}
        <p className="loading-text">
          {statusMessage}
        </p>

        {/* Progress Bar */}
        <div className="loading-progress">
          <div className="loading-bar"></div>
          <span className="progress-percent">{Math.round(progress)}%</span>
        </div>

        {/* Status */}
        <div className="loading-status">
          <LoaderCircle className="loading-spinner" size={16} strokeWidth={1.5} />
          <span>loading</span>
          <span className="status-dots">
            <span>.</span><span>.</span><span>.</span>
          </span>
        </div>

        {/* Player Count - Gaming Business Metric */}
        <div className="player-count">
          <Users size={10} strokeWidth={1.5} />
          <span className="count-number">1,247</span>
          <span>players online</span>
        </div>

        {/* Level Progress - Gaming Element */}
        <div className="level-progress">
          <span className="level-icon">
            <Award size={10} strokeWidth={1.5} />
          </span>
          <span className="level-text">Level 42</span>
          <div className="level-bar">
            <div className="level-fill"></div>
          </div>
        </div>

        {/* Connection Status */}
        <div className="connection-status">
          <Wifi size={10} strokeWidth={1.5} />
          <span className="status-icon"></span>
          <span>connected</span>
        </div>

        {/* Security */}
        <div className="loading-security">
          <ShieldCheck size={12} strokeWidth={1.5} />
          <span>secure connection</span>
        </div>

        {/* Telegram Bot Status */}
        <div className="telegram-bot-status">
          <span className="bot-dot"></span>
          <span>@ArkeyBot online</span>
        </div>

        {/* Game Version */}
        <div className="loading-hint">
          <Zap size={10} strokeWidth={1.5} />
          <span>v2.1.4 · ready</span>
        </div>

        {/* Loading Tip */}
        <div className="loading-tip">
          💡 Tip: Complete daily challenges for extra rewards
        </div>
      </div>
    </div>
  );
}