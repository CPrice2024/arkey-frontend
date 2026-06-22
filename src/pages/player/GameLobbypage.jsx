import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Trophy,
  Wallet,
  Play,
  TrendingUp,
  Users,
  Diamond,
  Flame,
  Shield,
  ChevronRight,
  Menu,
  Crown,
  Zap,
  X
} from "lucide-react";

import "../../styles/gameLobby.css";

const API_BASE_URL =
  "https://underfoot-cure-kissing.ngrok-free.dev/api";

const games = [
  {
    id: 1,
    name: "Aviator",
    image:
      "https://cdn-icons-png.flaticon.com/512/744/744465.png",
    players: "12.5K",
    multiplier: "10x",
    minBet: 10,
    color: "#1a1a1a",
  },
  {
    id: 2,
    name: "Fast Keno",
    image:
      "https://cdn-icons-png.flaticon.com/512/1055/1055687.png",
    players: "8.2K",
    multiplier: "5x",
    minBet: 5,
    color: "#1a1a1a",
  },
  {
    id: 3,
    name: "Bingo",
    image:
      "https://cdn-icons-png.flaticon.com/512/3612/3612569.png",
    players: "14K",
    multiplier: "3x",
    minBet: 15,
    color: "#1a1a1a",
  },
];


function GameLobbyPage() {

  const [allowed, setAllowed] =
    useState(false);

  const [user, setUser] =
    useState(null);

  const [balance, setBalance] =
    useState(0);

    const [playerStats, setPlayerStats] =
  useState({
    activeGames: 0,
    totalBets: 0,
    wins: 0,
    losses: 0
  });

const [playerInfo, setPlayerInfo] =
  useState(null);

const [recentBets, setRecentBets] =
  useState([]);

  const [showMenu, setShowMenu] =
    useState(false);

  const [selectedGame, setSelectedGame] =
    useState(null);

  // =====================================
  // INITIALIZE TELEGRAM + FETCH BALANCE
  // =====================================

useEffect(() => {

  const initializeApp = async () => {

    try {

      if (
        !window.Telegram ||
        !window.Telegram.WebApp
      ) {
        console.log(
          "NO TELEGRAM WEBAPP"
        );
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
        await axios.post(
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

      setBalance(
        loginResponse.data.user.balance || 0
      );

      // LOAD LOBBY

      const lobbyResponse =
        await axios.get(
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

      setPlayerStats(
        lobbyResponse.data.stats || {
          activeGames: 0,
          totalBets: 0,
          wins: 0,
          losses: 0
        }
      );

      setRecentBets(
        lobbyResponse.data.recentBets || []
      );

      setAllowed(true);

      webApp.MainButton.setText(
        "Start Playing"
      );

      webApp.MainButton.show();

      webApp.MainButton.onClick(
        () => {
          webApp.showAlert(
            "🎮 Welcome to Arkey Games!"
          );
        }
      );

    } catch (error) {

      console.log(
        "INITIALIZE ERROR:"
      );

      console.log(
        error.response?.data ||
        error.message
      );

    }

  };

  initializeApp();

}, []);

// =====================================
// PLAY GAME
// =====================================

const handlePlayGame = (game) => {

  setSelectedGame(game);

  if (
    window.Telegram &&
    window.Telegram.WebApp
  ) {

    window.Telegram.WebApp.showAlert(
      `Starting ${game.name} game...`
    );
  }
};

// =====================================
// DEPOSIT
// =====================================

const handleDeposit = () => {

  if (
    window.Telegram &&
    window.Telegram.WebApp
  ) {

    window.Telegram.WebApp.showAlert(
      "💳 Deposit feature coming soon!"
    );
  }
};
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
          {balance} ETB
        </span>

      </div>

    </div>

  </div>

);}

export default GameLobbyPage;