import React from "react";
import {
  X,
  Wallet,
  Phone,
  User,
  BadgeCheck,
  Calendar,
  Shield
} from "lucide-react";

export default function ProfileDrawer({

  player,

  balance,

  open,

  onClose

}) {

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

            <h2>My Profile</h2>

            <p>Player Information</p>

          </div>

          <button
            className="drawer-close"
            onClick={onClose}
          >
            <X size={22}/>
          </button>

        </div>

        <div className="profile-avatar">

          {player?.firstName?.charAt(0) || "A"}

        </div>

        <h3>

          {player?.firstName} {player?.lastName}

        </h3>

        <span className="profile-username">

          @{player?.username}

        </span>

        <div className="profile-info">

          <div className="profile-item">

            <Wallet size={18}/>

            <span>

              {balance.toLocaleString()} Birr

            </span>

          </div>

          <div className="profile-item">

            <Phone size={18}/>

            <span>

              {player?.phone || "Not Added"}

            </span>

          </div>

          <div className="profile-item">

            <User size={18}/>

            <span>

              {player?.telegramId}

            </span>

          </div>

          <div className="profile-item">

            <BadgeCheck size={18}/>

            <span>

              {player?.role}

            </span>

          </div>

          <div className="profile-item">

            <Calendar size={18}/>

            <span>

              Joined Player

            </span>

          </div>

        </div>

        <button className="logout-player-btn">

          <Shield size={18}/>

          Secure Account

        </button>

      </div>

    </>

  );

}