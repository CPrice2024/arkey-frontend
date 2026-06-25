import React from "react";
import {
  Play,
  Star
} from "lucide-react";

export default function GameCard({ game }) {

  const openGame = () => {

    alert(`${game.name} Coming Soon`);

    // Later:
    // window.location.href = game.url;

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

            <Star size={12}/>

            Featured

          </div>

        )}

      </div>

      <div className="game-info">

        <h3>{game.name}</h3>

        <p>{game.provider}</p>

        <button
          onClick={openGame}
          className="play-btn"
        >

          <Play size={16}/>

          Play

        </button>

      </div>

    </div>

  );

}