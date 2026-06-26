import React from "react";

export default function ErrorScreen({ message }) {
  return (
    <div className="loading-page">

      <div className="loading-card">

        <h2>Connection Failed</h2>

        <p>{message}</p>

      </div>

    </div>
  );
}