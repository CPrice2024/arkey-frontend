import React from "react";

import {
  X,
  Shield,
  ArrowDownToLine,
  ArrowUpFromLine,
  Clock,
} from "lucide-react";


import "../../styles/profile.css";

export default function ProfileDrawer({

  player,

  balance,

  transactions = [],

  open,

  onClose,

  onDeposit,

  onWithdraw

})
{

  if (!open) return null;

  return (

    <>

      <div
        className="drawer-overlay"
        onClick={onClose}
      />

      <div className="profile-drawer">

        <div className="drawer-header">

          <div>
            <h2>Player Center</h2>
            <p>Manage your account</p>

          </div>

          <button
            className="drawer-close"
            onClick={onClose}
          >
            <X size={22}/>
          </button>

        </div>

        <div className="player-card">

  <div className="profile-user">

    <div className="profile-avatar">
      {player?.firstName?.charAt(0)?.toUpperCase() || "P"}
    </div>

    <div className="player-details">

      <h2>{player?.firstName}</h2>

      <p>{player?.phone}</p>

      <small>@{player?.username}</small>

    </div>

  </div>

</div>

        <span className="profile-username">

          @{player?.username}

        </span>

<div className="balance-summary">

<div className="balance-box">

<div className="balance-icon">
💰
</div>

<div>

<p>Balance</p>

<h2>

{Number(balance).toFixed(2)} ETB

</h2>

</div>

</div>

<div className="credit-box">

<div className="balance-icon">
🎁
</div>

<div>

<p>Credit</p>

<h2>0.00 ETB</h2>

</div>

</div>

</div>
<div className="quick-actions">

<button
onClick={onWithdraw}
className="withdraw-btn"
>

<ArrowUpFromLine size={18}/>

Withdraw

</button>

<button
onClick={onDeposit}
className="deposit-btn"
>

<ArrowDownToLine size={18}/>

Deposit

</button>

</div>
<div className="transactions">

  <div className="section-header">

<div>

<h3>

Recent Transactions

</h3>

<small>

Latest deposits & withdrawals

</small>

</div>

</div>

  {transactions.length > 0 ? (

    transactions.slice(0, 5).map((item) => (

      <div
        key={item._id}
        className="transaction-item"
      >

        <div>

          <div className="transaction-info">

<strong>

{item.type}

</strong>

<small>

{item.status}

</small>

</div>

        </div>

        <span>

          {Number(item.amount).toLocaleString()} ETB

        </span>

      </div>

    ))

  ) : (

    <div className="empty-transactions">

<Clock size={60}/>

<h4>

No Transactions Yet

</h4>

<p>

Your deposits and withdrawals
will appear here.

</p>

</div>

  )}

</div>
<button
className="view-all-btn"
>

View All Transactions

</button>
<button className="logout-player-btn">

  <Shield size={18} />

  Security Settings

</button>

</div>
    </>

  );

}