import React, { useEffect, useState } from "react";
import api from "../../api";
import {  } from "lucide-react";
import { useNavigate } from "react-router-dom";

import "../../styles/worldCupPage.css";
import PredictionHeader from "../../components/prediction/PredictionHeader";
import HeroCard from "../../components/prediction/HeroCard";
import EventInfoCard from "../../components/prediction/EventInfoCard";
import Countdown from "../../components/prediction/Countdown";
import PredictionGrid from "../../components/prediction/PredictionGrid";
import RulesCard from "../../components/prediction/RulesCard";
import ConfirmModal from "../../components/prediction/ConfirmModal";
import SuccessModal from "../../components/prediction/SuccessModal";


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
        <PredictionHeader
    onBack={() => navigate(-1)}
/>

<HeroCard/>

<EventInfoCard
    balance={balance}
    minimumBet={20}
    prize="100,000 ETB"
    participants={1235}
/>

<Countdown
    targetDate="2026-08-15T18:00:00"
/>

<PredictionGrid
    onSelect={handlePrediction}
/>

<RulesCard/>

<ConfirmModal
    open={showConfirm}
    score={selectedPrediction}
    balance={balance}
    entryFee={20}
    onCancel={() => setShowConfirm(false)}
    onConfirm={confirmPrediction}
/>

<SuccessModal
    open={showSuccess}
    score={selectedPrediction}
    onClose={() => setShowSuccess(false)}
/>

    </div>
  );
}