import React, { useEffect, useState } from "react";
import api from "../../api";

import Header from "../../components/player/Header";
import CouponBanner from "../../components/player/CouponBanner";
import FeaturedGames from "../../components/player/FeaturedGames";
import BottomNavigation from "../../components/player/BottomNavigation";
import LoadingScreen from "../../components/player/LoadingScreen";
import ErrorScreen from "../../components/player/ErrorScreen";

import "../../styles/gameLobby.css";

export default function Game() {

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [player, setPlayer] = useState(null);

  const [balance, setBalance] = useState(0);

  const [games, setGames] = useState([]);

  useEffect(() => {

    initialize();

  }, []);

  const loadBalance = async () => {

    try {

       const res = await api.get("/game");

setBalance(
  res.data.player?.balance || 0
);

    }

    catch(err){

        console.log(err);

    }

};

  async function initialize() {

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

const lobby = await api.get("/game", {
  headers: {
    Authorization: `Bearer ${token}`
  }
});

      const player = lobby.data.player;

setPlayer(player);

setBalance(
  player?.balance || 0
);

      setGames(

    lobby.data.games ||

    [

      {
        _id:1,
        name:"Bingo",
        provider:"Arkey",
        featured:true,
        image:"https://picsum.photos/400/300?1"
      },

      {
        _id:2,
        name:"Aviator",
        provider:"Spribe",
        featured:true,
        image:"https://picsum.photos/400/300?2"
      },

      {
        _id:3,
        name:"Fast Keno",
        provider:"Arkey",
        featured:false,
        image:"https://picsum.photos/400/300?3"
      },

      {
        _id:4,
        name:"Fish Hunter",
        provider:"JDB",
        featured:false,
        image:"https://picsum.photos/400/300?4"
      },

      {
        _id:5,
        name:"Chicken Road",
        provider:"Turbo",
        featured:true,
        image:"https://picsum.photos/400/300?5"
      },

      {
        _id:6,
        name:"Wheel",
        provider:"Arkey",
        featured:false,
        image:"https://picsum.photos/400/300?6"
      }

    ]

);

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

  }

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

    onDeposit={() => {

        alert("Deposit page coming soon.");

    }}

/>

      <CouponBanner />

      <FeaturedGames

        games={games}

      />

      <BottomNavigation
    onPromo={() => alert("Promo")}
    onSupport={() => alert("Support")}
    onProfile={() => alert("Profile")}
    onDeposit={() => alert("Deposit")}
/>

    </div>

  );

}