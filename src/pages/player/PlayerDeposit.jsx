import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";

import {
  ArrowLeft,
  Wallet,
  Copy,
  CheckCircle,
  Smartphone,
  Landmark,
} from "lucide-react";

import "../../styles/depositPage.css";

export default function PlayerDeposit() {

  const navigate = useNavigate();

  const [player, setPlayer] = useState(null);

  const [balance, setBalance] = useState(0);

  const [amount, setAmount] = useState("");

  const [method, setMethod] = useState("telebirr");

  const [depositNumber, setDepositNumber] = useState("");

  const [transactionId, setTransactionId] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {

    loadPlayer();

  }, []);

  async function loadPlayer() {

    try {

      const res = await api.get("/game");

      setPlayer(res.data.player);

      setBalance(res.data.player.balance);

    } catch (err) {

      console.log(err);

    }

  }

  return (
  <div className="deposit-page">

    {/* Header */}
    <div className="deposit-header">

      <button
        className="back-btn"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={20} />
      </button>

      <h2>Deposit</h2>

    </div>

    {/* Balance Card */}

    <div className="balance-card">

      <p>Available Balance</p>

      <h1>{balance.toFixed(2)} ETB</h1>

    </div>

    {/* Player Card */}

    <div className="deposit-card">

      <h3>Player Information</h3>

      <div className="info-row">
        <span>Name</span>
        <strong>{player?.firstName}</strong>
      </div>

      <div className="info-row">
        <span>Username</span>
        <strong>{player?.username}</strong>
      </div>

      <div className="info-row">
        <span>Phone</span>
        <strong>{player?.phone}</strong>
      </div>

    </div>

    {/* Amount */}

    <div className="deposit-card">

      <h3>Deposit Amount</h3>

      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e)=>setAmount(e.target.value)}
      />

    </div>

    {/* Payment Method */}

    <div className="deposit-card">

      <h3>Payment Method</h3>

      <div className="method-grid">

        <button
          className={
            method==="telebirr"
            ? "method active"
            : "method"
          }
          onClick={()=>setMethod("telebirr")}
        >
          <Smartphone size={20}/>
          Telebirr
        </button>

        <button
          className={
            method==="cbe"
            ? "method active"
            : "method"
          }
          onClick={()=>setMethod("cbe")}
        >
          <Landmark size={20}/>
          CBE Birr
        </button>

      </div>

    </div>

    {/* Deposit Number */}

    <div className="deposit-card">

      <h3>Deposit Number</h3>

      <div className="deposit-number">

        <span>{depositNumber || "Loading..."}</span>

        <button>

          <Copy size={18}/>

        </button>

      </div>

    </div>

    {/* Transaction */}

    <div className="deposit-card">

      <h3>Transaction ID</h3>

      <input
        placeholder="TRX123456789"
        value={transactionId}
        onChange={(e)=>
          setTransactionId(
            e.target.value
          )
        }
      />

    </div>

    {/* Guide */}

    <div className="deposit-card">

      <h3>How to Deposit</h3>

      <ol>

        <li>Choose payment method</li>

        <li>Send the exact amount</li>

        <li>Copy Transaction ID</li>

        <li>Paste Transaction ID</li>

        <li>Press Confirm Deposit</li>

      </ol>

    </div>

    {/* Buttons */}

    <div className="deposit-buttons">

      <button
        className="cancel-btn"
        onClick={()=>navigate(-1)}
      >
        Cancel
      </button>

      <button
        className="submit-btn"
      >
        Confirm Deposit
      </button>

    </div>

  </div>
);

}