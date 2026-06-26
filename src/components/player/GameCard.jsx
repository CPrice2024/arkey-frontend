import React from "react";
import { Play, Star } from "lucide-react";

export default function GameCard({ game }) {

  const openGame = () => {

    alert(`${game.name} Coming Soon`);

  };

  return (

    <div className="game-card">

      <div className="game-image-wrapper">

        <img
          src={game.image}
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
        >

          <Play size={14} />

          Play

        </button>

      </div>

    </div>

  );

}