import React from "react";
import { Shield } from "lucide-react";

export default function LoadingScreen() {
  return (
    <div className="loading-page">
      <div className="loading-card">
        <Shield size={55} />

        <h2>Loading Arkey Games...</h2>

        <p>Please wait...</p>
      </div>
    </div>
  );
}