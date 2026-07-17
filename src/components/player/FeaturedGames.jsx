import React, { useMemo } from "react";
import GameCard from "./GameCard";

export default function FeaturedGames({ games = [] }) {
  // Show first 12 games as featured
  const featuredGames = useMemo(
    () => games.slice(0, 12),
    [games]
  );

  const crashGames = useMemo(
    () =>
      games.filter((g) =>
        (g.category || "").toLowerCase().includes("crash")
      ),
    [games]
  );

  const slotGames = useMemo(
    () =>
      games.filter((g) =>
        (g.category || "").toLowerCase().includes("slot")
      ),
    [games]
  );

  const instantGames = useMemo(
    () =>
      games.filter((g) =>
        (g.category || "").toLowerCase().includes("instant")
      ),
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
        "Recommended",
        featuredGames
      )}

      {renderSection(
        "⚡ Instant Games",
        "Play instantly",
        instantGames
      )}

      {renderSection(
        "🚀 Crash Games",
        "Crash games",
        crashGames
      )}

      {renderSection(
        "🎰 Slot Games",
        "Slots",
        slotGames
      )}
    </>
  );
}