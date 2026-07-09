import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";

import {
  ArrowLeft,
  Loader2,
  RefreshCw
} from "lucide-react";

import TelebirrIcon from "../../assets/icons/telebirr.png";
import CbeIcon from "../../assets/icons/cbe.png";
import MpesaIcon from "../../assets/icons/mpesa.png";
import BankIcon from "../../assets/icons/bank.png";

import "../../styles/withdrawalPage.css";

export default function PlayerWithdrawal() {

  const navigate = useNavigate();

  const [player, setPlayer] = useState(null);

const [balance, setBalance] = useState(0);

const [amount, setAmount] = useState("");

const [method, setMethod] = useState("telebirr");

const [accountNumber, setAccountNumber] = useState("");

const [accountHolder, setAccountHolder] = useState("");

const [loading, setLoading] = useState(false);

const [notification, setNotification] = useState({
  show: false,
  type: "",
  message: "",
});

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
  
const submitWithdrawal = async () => {

  if (!accountNumber) {

    showNotification("error", "Enter account number.");
return;

  }

  if (!amount) {

    return showNotification("error", "Enter withdrawal amount.");

  }

  if (Number(amount) > balance) {

    return showNotification("error","Insufficient balance." );

  }

  try {

    setLoading(true);

    const res = await api.post("/withdrawals",{

      method,

      amount:Number(amount),

      accountNumber,

      note:accountHolder

    });

    setNotification({

      show:true,

      type:"success",

      message:res.data.message

    });

    setAmount("");

    setAccountNumber("");

    setAccountHolder("");

    await loadPlayer();

setAmount("");
setAccountNumber("");
setAccountHolder("");

  }

  catch(err){

    setNotification({

      show:true,

      type:"error",

      message:
      err.response?.data?.message ||
      "Withdrawal failed."

    });

  }

  finally{

    setLoading(false);

    setTimeout(()=>{

      setNotification({

        show:false,

        type:"",

        message:""

      });

    },2500);

  }

  
};
const showNotification = (type, message) => {

  setNotification({
    show: true,
    type,
    message
  });

  setTimeout(() => {

    setNotification({
      show: false,
      type: "",
      message: ""
    });

  }, 2500);

};


  return (
    <>
    {notification.show && (
      <div
        className={`overlay-notification ${notification.type}`}
      >
        {notification.message}
      </div>
    )}
   
  <div className="withdrawal-page">

    {/* Header */}
    <div className="withdrawal-header">

      <button
        className="back-btn"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={20} />
      </button>

      <h2>Withdraw</h2>

<p className="withdrawal-subtitle">
  Withdraw your funds easily and securely.
</p>

    </div>

    {/* Balance Card */}

    <div className="balance-card">

<div className="balance-top">

<p>Available Balance</p>

<button
onClick={loadPlayer}
className="refresh-btn"
>

<RefreshCw size={18}/>

</button>

</div>

<h1>

{balance.toFixed(2)} ETB

</h1>

</div>

    {/* Player Card */}

    <div className="withdrawal-card">

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

    <div className="withdrawal-card">

      <h3>Withdrawal Amount</h3>

      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e)=>setAmount(e.target.value)}
      />
      <div className="remaining-balance">

Remaining Balance

<strong>

{Math.max(
0,
balance - Number(amount || 0)
).toFixed(2)} ETB

</strong>

</div>

    </div>

    {/* Payment Method */}

    <div className="withdrawal-card">

      <h3>Payment Method</h3>

      <div className="method-grid">

        <button
  className={method === "telebirr" ? "method active" : "method"}
  onClick={() => setMethod("telebirr")}
>
  <img
    src={TelebirrIcon}
    alt="Telebirr"
    className="payment-icon"
  />
  Telebirr
</button>

<button
  className={method === "cbe" ? "method active" : "method"}
  onClick={() => setMethod("cbe")}
>
  <img
    src={CbeIcon}
    alt="CBE"
    className="payment-icon"
  />
  CBE Birr
</button>

<button
  className={method === "Mpesa" ? "method active" : "method"}
  onClick={() => setMethod("Mpesa")}
>
  <img
    src={MpesaIcon}
    alt="Mpesa"
    className="payment-icon"
  />
  Mpesa
</button>

<button
  className={method === "bank" ? "method active" : "method"}
  onClick={() => setMethod("bank")}
>
  <img
    src={BankIcon}
    alt="Bank"
    className="payment-icon"
  />
  Bank
</button>

      </div>

    </div>

    {/* Transaction */}

    <div className="withdrawal-card">

      <h3>Account Number</h3>

     <input
placeholder="Enter account number"
value={accountNumber}
onChange={(e)=>setAccountNumber(e.target.value)}
/>

    </div>
    <div className="withdrawal-card">

<h3>Account Holder</h3>

<input

placeholder="Enter account holder name"

value={accountHolder}

onChange={(e)=>

setAccountHolder(e.target.value)

}

/>

</div>

    {/* Guide */}

    <div className="withdrawal-card">

      <h3>How to withdrawal</h3>
      <ol>
  <li>Select your preferred withdrawal method.</li>
  <li>Enter your account number.</li>
  <li>Enter the account holder's name.</li>
  <li>Enter the amount you want to withdraw.</li>
  <li>Submit your withdrawal request.</li>
  <li>Wait for approval from our team.</li>
</ol>

    </div>

    {/* Buttons */}

    <div className="withdrawal-buttons">

      <button
        className="cancel-btn"
        onClick={()=>navigate(-1)}
      >
        Cancel
      </button>

     <button
  className="submit-btn"
  disabled={loading}
  style={{
    opacity: loading ? 0.7 : 1
  }}
  onClick={submitWithdrawal}
>

{loading ? (

<>
<Loader2
size={18}
className="spin"
/>
 
Submitting...

</>

) : (

"Withdraw"

)}

</button>

    </div>

  </div>

</>

);
}