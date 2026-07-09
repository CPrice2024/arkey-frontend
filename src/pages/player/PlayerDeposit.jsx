import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import { ReactComponent as TelebirrIcon } from "../../assets/icons/telebirr.svg";
import { ReactComponent as CbeIcon } from "../../assets/icons/cbe.svg";

import {
  ArrowLeft,
  Copy,
  CheckCircle,
  Loader2,
} from "lucide-react";

// OR use inline SVG components

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
  const [copied, setCopied] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    type: "",
    message: "",
  });

  useEffect(() => {
    loadPlayer();
  }, []);

  useEffect(() => {
    const telebirrNumbers = [
      "0911223344",
      "0922334455",
      "0933445566",
      "0944556677",
      "0955667788",
    ];

    const cbeNumbers = [
      "0966778899",
      "0977889900",
      "0988990011",
      "0999001122",
      "0910112233",
    ];

    const numbers = method === "telebirr" ? telebirrNumbers : cbeNumbers;
    const randomNumber = numbers[Math.floor(Math.random() * numbers.length)];
    setDepositNumber(randomNumber);
  }, [method]);

  async function loadPlayer() {
    try {
      const res = await api.get("/game");
      setPlayer(res.data.player);
      setBalance(res.data.player.balance);
    } catch (err) {
      console.log(err);
    }
  }

  const copyDepositNumber = async () => {
    if (!depositNumber) return;

    try {
      await navigator.clipboard.writeText(depositNumber);
      setCopied(true);
      setNotification({
        show: true,
        type: "success",
        message: "Deposit number copied successfully.",
      });

      setTimeout(() => {
        setCopied(false);
        setNotification({
          show: false,
          type: "",
          message: "",
        });
      }, 2000);
    } catch {
      setNotification({
        show: true,
        type: "error",
        message: "Failed to copy deposit number.",
      });

      setTimeout(() => {
        setNotification({
          show: false,
          type: "",
          message: "",
        });
      }, 2500);
    }
  };

  const submitDeposit = async () => {
    if (!amount) {
      setNotification({
        show: true,
        type: "error",
        message: "Please enter deposit amount.",
      });

      setTimeout(() => {
        setNotification({
          show: false,
          type: "",
          message: "",
        });
      }, 2500);

      return;
    }

    if (!transactionId) {
      setNotification({
        show: true,
        type: "error",
        message: "Please enter transaction ID.",
      });

      setTimeout(() => {
        setNotification({
          show: false,
          type: "",
          message: "",
        });
      }, 2500);

      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/deposits", {
        method,
        amount: Number(amount),
        depositNumber,
        transactionId,
        note: "Deposit from React Player",
      });

      setNotification({
        show: true,
        type: "success",
        message: res.data.message || "Deposit submitted successfully.",
      });

      setAmount("");
      setTransactionId("");

      const telebirrNumbers = [
        "0911223344",
        "0922334455",
        "0933445566",
        "0944556677",
        "0955667788",
      ];

      const cbeNumbers = [
        "0966778899",
        "0977889900",
        "0988990011",
        "0999001122",
        "0910112233",
      ];

      const numbers = method === "telebirr" ? telebirrNumbers : cbeNumbers;
      setDepositNumber(numbers[Math.floor(Math.random() * numbers.length)]);

      await loadPlayer();
    } catch (err) {
      console.log(err);
      setNotification({
        show: true,
        type: "error",
        message: err.response?.data?.message || "Failed to submit deposit.",
      });
    } finally {
      setLoading(false);

      setTimeout(() => {
        setNotification({
          show: false,
          type: "",
          message: "",
        });
      }, 2500);
    }
  };

  return (
    <>
      {notification.show && (
        <div className={`overlay-notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      <div className="deposit-page">
        {/* Header */}
        <div className="deposit-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
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
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        {/* Payment Method - With Custom Icons */}
        <div className="deposit-card">
          <h3>Payment Method</h3>
          <div className="method-grid">
           <button
  className={method === "telebirr" ? "method active" : "method"}
  onClick={() => setMethod("telebirr")}
>
  <TelebirrIcon width={20} height={20} />
  Telebirr
</button>

<button
  className={method === "cbe" ? "method active" : "method"}
  onClick={() => setMethod("cbe")}
>
  <CbeIcon width={20} height={20} />
  CBE Birr
</button>
          </div>
        </div>

        {/* Deposit Number */}
        <div className="deposit-card">
          <h3>Deposit Number</h3>
          <div className="deposit-number">
            <span>{depositNumber || "Loading..."}</span>
            <button onClick={copyDepositNumber}>
              {copied ? <CheckCircle size={18} /> : <Copy size={18} />}
            </button>
          </div>
        </div>

        {/* Transaction */}
        <div className="deposit-card">
          <h3>Transaction ID</h3>
          <input
            placeholder="TRX123456789"
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
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
          <button className="cancel-btn" onClick={() => navigate(-1)}>
            Cancel
          </button>

          <button
            className="submit-btn"
            disabled={loading}
            onClick={submitDeposit}
          >
            {loading ? (
              <>
                <Loader2 size={18} className="spin" />
                Submitting...
              </>
            ) : (
              "Confirm Deposit"
            )}
          </button>
        </div>
      </div>
    </>
  );
}