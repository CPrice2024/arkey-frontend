import React from "react";
import {
  Wallet,
  Trophy,
  Coins,
  Users,
} from "lucide-react";
import "../../styles/prediction/eventInfoCard.css";

const EventInfoCard = ({
  balance,
  minimumBet,
  prize,
  participants = 0,
}) => {
  return (
    <section className="event-card">

      <div className="event-card-title">
        📋 Event Information
      </div>

      <div className="event-grid">

        <div className="event-item">
          <Coins className="event-icon green" />

          <div>

            <span>Entry Fee</span>

            <strong>{minimumBet} ETB</strong>

          </div>

        </div>

        <div className="event-item">

          <Wallet className="event-icon blue" />

          <div>

            <span>Your Balance</span>

            <strong>{balance.toFixed(2)} ETB</strong>

          </div>

        </div>

        <div className="event-item">

          <Trophy className="event-icon orange" />

          <div>

            <span>Prize Pool</span>

            <strong>{prize}</strong>

          </div>

        </div>

        <div className="event-item">

          <Users className="event-icon purple" />

          <div>

            <span>Players Joined</span>

            <strong>{participants}</strong>

          </div>

        </div>

      </div>

    </section>
  );
};

export default EventInfoCard;