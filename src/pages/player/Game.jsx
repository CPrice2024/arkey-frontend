import React, { useEffect, useState } from "react";
import api from "../../api";

import {
  Wallet,
  Shield,
} from "lucide-react";

import "../../styles/gameLobby.css";

const API_BASE_URL =
  process.env.REACT_APP_API_URL;


function Game() {

  const [allowed, setAllowed] =
    useState(false);

  const [user, setUser] =
    useState(null);

  const [balance, sBirralance] =
    useState(0);



const [playerInfo, setPlayerInfo] =
  useState(null);


  // =====================================
  // INITIALIZE TELEGRAM + FETCH BALANCE
  // =====================================

useEffect(() => {

  const initializeApp = async () => {

    try {

      if (!window.Telegram?.WebApp) {

  console.log("Telegram WebApp not detected.");

  if (process.env.NODE_ENV === "development") {
    setAllowed(true);
  }

  return;
}

      const webApp =
        window.Telegram.WebApp;

      webApp.ready();
      webApp.expand();
      console.log("INIT DATA:");
console.log(webApp.initData);

console.log("INIT DATA UNSAFE:");
console.log(webApp.initDataUnsafe);

      const telegramUser =
        webApp.initDataUnsafe?.user;

      if (!telegramUser) {

        console.log(
          "NO TELEGRAM USER FOUND"
        );

        return;
      }

      console.log(
        "TELEGRAM USER:"
      );

      console.log(
        telegramUser
      );

      setUser(
        telegramUser
      );

      // TELEGRAM LOGIN

      const loginResponse =
        await api.post(
          `${API_BASE_URL}/auth/telegram-login`,
          {
            telegramId:
              telegramUser.id
          }
        );

      localStorage.setItem(
        "token",
        loginResponse.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(
          loginResponse.data.user
        )
      );

      sBirralance(
        loginResponse.data.user.balance || 0
      );

      // LOAD LOBBY

      const lobbyResponse =
        await api.get(
          `${API_BASE_URL}/game`,
          {
            headers: {
              Authorization:
                `Bearer ${loginResponse.data.token}`
            }
          }
        );

      console.log(
        "GAME DATA:"
      );

      console.log(
        lobbyResponse.data
      );

      setPlayerInfo(
        lobbyResponse.data.player
      );

      setAllowed(true);

      webApp.MainButton.setText(
        "Start Playing"
      );

      webApp.MainButton.show();

      webApp.MainButton.onClick(
        () => {
          webApp.showAlert( "🎮 Welcome to Arkey Games!"
          );
        }
      );

    } catch (error) {

      console.log(
        "INITIALIZE ERROR:"
      );

      console.error(error);

alert(
  error.response?.data?.message ||
  "Unable to connect to the server."
);

    }

  };

  initializeApp();

}, []);



if (!allowed) {

  return (
    <div className="blocked-page">
      <div className="blocked-content">

        <div className="blocked-icon">
          <Shield size={48} />
        </div>

        <h1>
          Loading Arkey Games...
        </h1>

      </div>
    </div>
  );
}
return (

  <div className="lobby-container">

    <div className="lobby-header">

      <h1>
        Welcome {
          playerInfo?.firstName ||
          user?.first_name
        }
      </h1>

      <div className="balance-card">

        <Wallet size={18} />

        <span>
          {balance} Birr
        </span>

      </div>

    </div>

  </div>

);}

export default Game;