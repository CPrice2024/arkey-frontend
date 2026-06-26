import React from "react";
import GameCard from "./GameCard";

export default function FeaturedGames({
  games
}) {

  return (

    <div className="featured-section">

      <div className="section-header">

        <h2>

          🎮 Featured Games

        </h2>

      </div>

      <div className="games-grid">

        {games.map((game) => (

          <GameCard

            key={game._id || game.name}

            game={game}

          />

        ))}

      </div>

    </div>

  );

}