import React, { useState } from "react";
import {
  Wallet,
  Eye,
  EyeOff,
  RotateCw,
  Plus
} from "lucide-react";

import logo from "../../assets/logo6.png";

export default function Header({
  player,
  balance,
  onRefresh,
  onDeposit
}) {

  const [showBalance, setShowBalance] =
    useState(false);

  return (

    <header className="game-header">

      {/* LEFT */}

      <div className="header-left">

        <img
          src={logo}
          alt="Arkey Bet"
          className="header-logo"
        />

      </div>

      {/* CENTER */}

      <div className="balance-box">

        <button
          className="refresh-btn"
          onClick={onRefresh}
        >
          <RotateCw size={26} />
        </button>

        <Wallet size={16} />

        <span>

          {showBalance
            ? `${balance.toLocaleString()} Birr`
            : "••••••••"}

        </span>

        <button
          className="eye-btn"
          onClick={() =>
            setShowBalance(!showBalance)
          }
        >
          {showBalance
            ? <EyeOff size={16}/>
            : <Eye size={16}/>
          }

        </button>

      </div>

      {/* RIGHT */}

      <button
        className="deposit-btn"
        onClick={onDeposit}
      >

        <Plus size={18} />

        Deposit

      </button>

    </header>

  );

}