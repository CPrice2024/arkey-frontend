import React, { useEffect, useState } from "react";
import api from "../../api";

import Header from "../../pages/components/player/Header";
import CouponBanner from "../../pages/components/player/CouponBanner";
import FeaturedGames from "../../pages/components/player/FeaturedGames";
import BottomNavigation from "../../pages/components/player/BottomNavigation";
import LoadingScreen from "../../pages/components/player/LoadingScreen";
import ErrorScreen from "../../pages/components/player/ErrorScreen";

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

        const res =
            await api.get("/game");

        setBalance(
            res.data.player.balance
        );

    }

    catch(err){

        console.log(err);

    }

};

  async function initialize() {

    try {

      if (!window.Telegram?.WebApp) {

        throw new Error(
          "Telegram WebApp not detected."
        );

      }
      

      const tg =
        window.Telegram.WebApp;

      tg.ready();

      tg.expand();

      const telegramUser =
        tg.initDataUnsafe.user;

      if (!telegramUser) {

        throw new Error(
          "Telegram user not found."
        );

      }

      

      const login =
        await api.post(
          "/auth/telegram-login",
          {
            telegramId:
              telegramUser.id
          }
        );

      localStorage.setItem(
        "token",
        login.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(
          login.data.user
        )
      );

      const lobby =
        await api.get("/game");

      setPlayer(
        lobby.data.player
      );

      setBalance(
        lobby.data.player.balance
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

      <BottomNavigation />

    </div>

  );

}