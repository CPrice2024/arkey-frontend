import React, { useMemo } from "react";
import GameCard from "./GameCard";

export default function FeaturedGames({ games = [] }) {
  const featuredGames = useMemo(
    () => games.filter((g) => g.featured),
    [games]
  );

  const crashGames = useMemo(
    () => games.filter((g) => g.category === "Crash"),
    [games]
  );

  const slotGames = useMemo(
    () => games.filter((g) => g.category === "Slots"),
    [games]
  );

  const renderSection = (title, subtitle, list) => {
    if (!list.length) return null;

    return (
      <div className="featured-section">
        <div className="section-header">
          <div>
            <h2>{title}</h2>
            <p>{subtitle}</p>
          </div>

          <button className="see-all-btn">
            See All
          </button>
        </div>

        <div className="games-grid">
          {list.map((game) => (
            <GameCard
              key={game._id}
              game={game}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      {renderSection(
        "🔥 Featured Games",
        "Most popular games",
        featuredGames
      )}

      {renderSection(
        "🚀 Crash Games",
        "Fast action games",
        crashGames
      )}

      {renderSection(
        "🎰 Slot Games",
        "Classic casino slots",
        slotGames
      )}
    </>
  );
}