import React from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

import "../../styles/worldCupPage.css";
import worldCupBg from "../../assets/world-cup.png";

export default function WorldCupPage() {
  const navigate = useNavigate();

  return (
    <div className="worldcup-page">
      {/* Hero */}
      <div
        className="worldcup-hero"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,.45), rgba(0,0,0,.8)), url(${worldCupBg})`,
        }}
      >
        <button
          className="close-page"
          onClick={() => navigate(-1)}
        >
          <X size={26} />
        </button>

        <div className="event-label">
          World Cup
        </div>

        <div className="teams-row">
          <div className="flag-circle">
            🇪🇸
          </div>

          <div className="vs-text">
            VS
          </div>

          <div className="flag-circle">
            🇦🇷
          </div>
        </div>

        <div className="team-names">
          <span>Spain</span>

          <span>Argentina</span>
        </div>

        <div className="prize-pill">
          🔥 💰 ETB 100,000 💰 🔥
        </div>
      </div>
    </div>
  );
}