import React, { useState } from "react";
import { Play, Star } from "lucide-react";
import api from "../../api";
import gameImages from "../../assets/gameImages";
import gameImageMap from "../../assets/gameImageMap";

export default function GameCard({ game }) {
  const [loading, setLoading] = useState(false);

  const openGame = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await api.get(
        `/games/launch?gameId=${game._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.launchUrl) {
        window.location.href = res.data.launchUrl;
      }
    } catch (err) {
      console.log(err);

      alert(
        err.response?.data?.message ||
          "Unable to launch game."
      );
    } finally {
      setLoading(false);
    }
  };
  const image =
  gameImages[gameImageMap[game.providerGameId]] ||
  game.image;

  return (
    <div className="game-card">
      <div className="game-image-wrapper">
        <img
          src={image}
          alt={game.name}
          className="game-image"
        />

        {game.featured && (
          <div className="featured-badge">
            <Star size={11} />
            HOT
          </div>
        )}
      </div>

      <div className="game-info">
        <h3>{game.name}</h3>

        <span>{game.provider}</span>

        <button
          className="play-btn"
          onClick={openGame}
          disabled={loading}
        >
          <Play size={14} />

          {loading ? "wait." : "Play"}
        </button>
      </div>
    </div>
  );
}