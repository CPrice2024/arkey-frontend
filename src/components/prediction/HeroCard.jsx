import React from "react";
import {
  Trophy,
  Circle,
} from "lucide-react";

import worldCupBg from "../../assets/world-cup.png";

import "../../styles/prediction/heroCard.css";

const HeroCard = () => {
  return (
    <section
      className="hero-card"
      style={{
        backgroundImage: `linear-gradient(rgba(8,12,20,.45), rgba(8,12,20,.92)), url(${worldCupBg})`,
      }}
    >
      <div className="hero-top">

        <span className="hero-badge">
          WORLD CUP
        </span>

        <span className="status-open">
          <Circle size={10} fill="currentColor" />
          Registration Open
        </span>

      </div>

      <div className="hero-trophy">
        <Trophy size={55} />
      </div>

      <div className="hero-match">

        <div className="team">

          <div className="flag">
            🇪🇸
          </div>

          <h3>Spain</h3>

        </div>

        <div className="vs-area">

          <span>VS</span>

        </div>

        <div className="team">

          <div className="flag">
            🇦🇷
          </div>

          <h3>Argentina</h3>

        </div>

      </div>

      <div className="hero-prize">

        <small>Prize Pool</small>

        <h2>100,000 ETB</h2>

      </div>

    </section>
  );
};

export default HeroCard;