import React from "react";
import { ArrowLeft } from "lucide-react";
import "../../styles/prediction/predictionHeader.css";

const PredictionHeader = ({ onBack }) => {
  return (
    <header className="prediction-header">

      <button
        className="back-btn"
        onClick={onBack}
      >
        <ArrowLeft size={22} />
      </button>

      <div>
        <h2>World Cup Prediction</h2>
        <p>Predict & Win Big</p>
      </div>

    </header>
  );
};

export default PredictionHeader;