import React from "react";
import {
  Gamepad2,
  LoaderCircle,
  ShieldCheck,
} from "lucide-react";

import logo from "../../assets/logo6.png";

export default function LoadingScreen() {
  return (
    <div className="loading-page">

      {/* Animated Background */}
      <div className="loading-bg"></div>

      <div className="loading-card">

        <div className="loading-logo">

          <img
            src={logo}
            alt="Arkey Bet"
          />

        </div>

        <div className="loading-title">

          <Gamepad2 size={30} />

          <h1>Arkey Games</h1>

        </div>

        <p className="loading-text">
          Connecting to secure gaming servers...
        </p>

        <div className="loading-progress">

          <div className="loading-bar"></div>

        </div>

        <div className="loading-status">

          <LoaderCircle
            className="loading-spinner"
            size={18}
          />

          <span>
            Authenticating your account...
          </span>

        </div>

        <div className="loading-security">

          <ShieldCheck size={18} />

          <span>
            Protected by Arkey Secure Platform
          </span>

        </div>

      </div>

    </div>
  );
}