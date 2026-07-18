import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";


import Header from "../../components/player/Header";
import CouponBanner from "../../components/player/CouponBanner";
import FeaturedGames from "../../components/player/FeaturedGames";
import BottomNavigation from "../../components/player/BottomNavigation";
import LoadingScreen from "../../components/player/LoadingScreen";
import ErrorScreen from "../../components/player/ErrorScreen";
import ProfileDrawer from "../../components/player/ProfileDrawer";
import FeaturedEvent from "../../components/player/FeaturedEvent";

import "../../styles/gameLobby.css";

export default function Game() {

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [player, setPlayer] = useState(null);

  const [balance, setBalance] = useState(0);

  const [games, setGames] = useState([]);

  const [showProfile, setShowProfile] = useState(false);

  const [transactions, setTransactions] = useState([]);

  const navigate = useNavigate();

  const openDeposit = () => {
  setShowProfile(false);
  navigate("/PlayerDeposit");
};

const openWithdrawal = () => {
  setShowProfile(false);
  navigate("/PlayerWithdrawal");
};

  

 

const loadBalance = async () => {
  try {

    const token = localStorage.getItem("token");

    const res = await api.get("/game", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setBalance(res.data.player?.balance || 0);

  } catch (err) {
    console.log(err);
  }
};

const loadTransactions = useCallback(async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await api.get("/transactions/player", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setTransactions(res.data.transactions || []);
  } catch (err) {
    console.log("Transaction Error:", err);
  }
}, []);

  const initialize = useCallback(async () => {

    try {

      const tg = window.Telegram?.WebApp;

if (!tg) {
  throw new Error("Please open this game from Telegram.");
}

tg.ready();
tg.expand();

const telegramUser = tg.initDataUnsafe?.user;

if (!telegramUser) {
  throw new Error("Telegram authentication failed.");
}

      

      const login =
        await api.post(
          "/auth/telegram-login",
          {
            telegramId:
              telegramUser.id
          }
        );

      const token = login.data.token;

localStorage.setItem("token", token);

localStorage.setItem(
  "user",
  JSON.stringify(login.data.user)
);

const playerRes = await api.get("/game", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const catalogRes = await api.get("/catalog");

const player = playerRes.data.player;

setPlayer(player);

setBalance(player.balance);
await loadTransactions();

setGames(
  (catalogRes.data.games || []).map((game) => ({
    ...game,
    name: game.gameName,
    featured: game.launchCount > 0,
  }))
);
console.log("Catalog count:", catalogRes.data.games.length);
 

      setLoading(false);

    }

    catch (err) {

      console.log(err);

      setError(
        err.response?.data?.message ||
        err.message
      );

      setLoading(false);

    }

 }, [loadTransactions]);

 useEffect(() => {
  initialize();
}, [initialize]);

 useEffect(() => {
  if (showProfile) {
    loadTransactions();
  }
}, [showProfile, loadTransactions]);

  if (loading) {

    return <LoadingScreen />;

  }

  if (error) {

    return (
      <ErrorScreen
        message={error}
      />
    );

  }
  console.log("Games:", games);
console.log("Player:", player);

  return (

    <div className="game-page">

      <Header
    player={player}
    balance={balance}
    onRefresh={loadBalance}
    onDeposit={openDeposit}

/>

      <CouponBanner
  onClick={() => navigate("/promotions")}
/>

<FeaturedEvent />

<FeaturedGames
  games={games}
/>
     <ProfileDrawer
  player={player}
  balance={balance}
  transactions={transactions}
  open={showProfile}
  onClose={() => setShowProfile(false)}
  onDeposit={openDeposit}
  onWithdraw={openWithdrawal}
/>

     <BottomNavigation
  onHome={() =>
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }
  onPromo={() => navigate("/promotions")}
  onSupport={() => alert("Support")}
  onProfile={() => setShowProfile(true)}
  onDeposit={openDeposit}
/>

    </div>

  );

}