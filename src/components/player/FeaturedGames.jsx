import React from "react";
import GameCard from "./GameCard";

export default function FeaturedGames({
  games
}) {

  return (

    <div className="featured-section">

      <div className="section-header">

  <div>

    <h2>Featured Games</h2>

    <p>Play and win big today</p>

  </div>

  <button>
    See All
  </button>

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