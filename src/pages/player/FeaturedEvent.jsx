import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/featuredEvent.css";

export default function FeaturedEvent() {
  const navigate = useNavigate();

  return (
    <div
      className="featured-event"
      onClick={() => navigate("/world-cup")}
    >
      <div className="event-badge">
        World Cup
      </div>

      <div className="event-prize">
        💰 ETB 100,000 💰
      </div>

      <div className="event-teams">
        <div className="team">
          🇪🇸
        </div>

        <span>VS</span>

        <div className="team">
          🇦🇷
        </div>
      </div>

      <h2>Spain vs Argentina</h2>

      <p>Tap to predict →</p>
    </div>
  );
}