import React from "react";

import {
  X,
  Shield,
  ArrowDownToLine,
  ArrowUpFromLine,
  History,
  Clock,
} from "lucide-react";

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

        <div className="profile-user">

<div className="profile-avatar">

{player?.firstName?.charAt(0)?.toUpperCase() || "P"}

</div>

<div>

<h2>

{player?.firstName}

</h2>

<p>

{player?.phone}

</p>

</div>

</div>

        <span className="profile-username">

          @{player?.username}

        </span>

<div className="balance-summary">

<div className="balance-box">

<p>Balance</p>

<h2>

{Number(balance || 0).toFixed(2)} ETB

</h2>

</div>

<div className="credit-box">

<p>Credit</p>

<h2>

0.00 ETB

</h2>

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

    <History size={18} />

    <h3>Recent Transactions</h3>

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

      <Clock size={50} />

      <p>Your recent deposits and withdrawals
        will appear here.</p>

    </div>

  )}

</div>
<button className="logout-player-btn">

  <Shield size={18} />

  Security Settings

</button>

</div>
    </>

  );

}