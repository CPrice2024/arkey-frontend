import React from "react";
import {
  ChevronRight,
  Gift,
  Users,
} from "lucide-react";

export default function PromoCard({ promo }) {
  const IconComponent = promo.icon || Gift;

  return (
    <div className={`promo-card ${promo.type || ''}`}>
      <div 
        className="promo-card-icon" 
        style={{ 
          '--promo-color': promo.color,
          '--promo-color-alpha': `${promo.color}10`,
          '--promo-color-border': `${promo.color}15`,
        }}
      >
        <IconComponent size={24} strokeWidth={1.5} style={{ color: promo.color }} />
      </div>
      
      <div className="promo-card-content">
        <div className="promo-card-header">
          <h3>{promo.title}</h3>
          <span className="promo-badge" style={{ backgroundColor: promo.color }}>
            {promo.bonus}
          </span>
          <span className="game-level-badge">
            <Users size={10} />
            {promo.users || 0}
          </span>
        </div>
        <p>{promo.description}</p>
        {promo.progress && (
          <div className="promo-progress">
            <div 
              className="progress-fill" 
              style={{ 
                width: `${promo.progress}%`,
                '--promo-color': promo.color 
              }}
            />
          </div>
        )}
      </div>

      <button className="promo-card-action">
        <ChevronRight size={16} strokeWidth={1.5} />
      </button>
    </div>
  );
}