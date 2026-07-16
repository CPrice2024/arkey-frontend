import React from "react";
import logo from "../../assets/logo6.png";
import "../../styles/loading.css";

export default function LoadingScreen() {
  return (
    <div className="loading-page">
      <div className="loading-container">
        <img
          src={logo}
          alt="Arkey"
          className="loading-logo"
        />

        <div className="loading-spinner"></div>

        <p className="loading-text">
          Please wait...
        </p>

        <p className="loading-secure">
          Secure with <strong>Arkeyin</strong>
        </p>
      </div>
    </div>
  );
}