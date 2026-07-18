import React, { useEffect, useState } from "react";
import api from "../../api";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

import "../../styles/worldCupPage.css";
import worldCupBg from "../../assets/world-cup.png";



export default function WorldCupPage() {
    const [selectedPrediction, setSelectedPrediction] = useState(null);
const [showConfirm, setShowConfirm] = useState(false);
const [showSuccess, setShowSuccess] = useState(false);
const [balance, setBalance] = useState(0);
const MIN_BET = 20;
  const navigate = useNavigate();

  useEffect(() => {
  loadPlayer();
}, []);

const loadPlayer = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await api.get("/game", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setBalance(res.data.player.balance);

  } catch (err) {
    console.log(err);
  }
};
const handlePrediction = (score) => {

  if (balance < MIN_BET) {

    alert(
      "Minimum balance required is 20 ETB."
    );

    return;
  }

  setSelectedPrediction(score);

  setShowConfirm(true);
};
const confirmPrediction = async () => {

  try {

    const token = localStorage.getItem("token");

    await api.post(
      "/predictions/place",
      {
        score: selectedPrediction,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setShowConfirm(false);

    setShowSuccess(true);

  } catch (err) {

    alert(
      err.response?.data?.message ||
      "Prediction failed."
    );

  }

};

  return (
    <div className="worldcup-page">
      {/* Hero */}
      <div
        className="worldcup-hero"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,.45), rgba(0,0,0,.8)), url(${worldCupBg})`,
        }}
      >
        <button
          className="close-page"
          onClick={() => navigate(-1)}
        >
          <X size={26} />
        </button>

        <div className="event-label">
          World Cup
        </div>

        <div className="teams-row">
          <div className="flag-circle">
            🇪🇸
          </div>

          <div className="vs-text">
            VS
          </div>

          <div className="flag-circle">
            🇦🇷
          </div>
        </div>

        <div className="team-names">
          <span>Spain</span>

          <span>Argentina</span>
        </div>

        <div className="prize-pill">
          🔥 💰 ETB 100,000 💰 🔥
        </div>
        <div className="prediction-section">

  <h2>Select your prediction</h2>

  <div className="prediction-grid">

    {[
      "1:0",
      "2:0",
      "2:1",
      "3:0",
      "3:1",
      "3:2",
    ].map((score) => (

      <button
        key={score}
        className="prediction-btn"
        onClick={() => handlePrediction(score)}
      >
        {score}
      </button>

    ))}

  </div>
  {showConfirm && (
  <div className="prediction-modal-overlay">
    <div className="prediction-modal">

      <h2>Confirm Prediction</h2>

      <p className="prediction-score">
        Spain <strong>{selectedPrediction}</strong> Argentina
      </p>

      <div className="prediction-info">
        <div>
          <span>Entry Fee</span>
          <strong>{MIN_BET} ETB</strong>
        </div>

        <div>
          <span>Your Balance</span>
          <strong>{balance.toFixed(2)} ETB</strong>
        </div>
      </div>

      <div className="prediction-actions">

        <button
          className="cancel-btn"
          onClick={() => setShowConfirm(false)}
        >
          Cancel
        </button>

        <button
          className="confirm-btn"
          onClick={confirmPrediction}
        >
          Confirm Prediction
        </button>

      </div>

    </div>
  </div>
)}
{showSuccess && (
  <div className="prediction-modal-overlay">
    <div className="prediction-modal success">

      <h1>✅</h1>

      <h2>Prediction Submitted!</h2>

      <p>
        Spain {selectedPrediction} Argentina
      </p>

      <p>
        20 ETB has been reserved.
      </p>

      <button
        className="confirm-btn"
        onClick={() => setShowSuccess(false)}
      >
        OK
      </button>

    </div>
  </div>
)}

</div>
      </div>
    </div>
  );
}