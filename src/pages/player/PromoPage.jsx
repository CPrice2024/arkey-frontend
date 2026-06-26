import React, { useState } from "react";
import PromoCard from "../../components/player/PromoCard";
import CouponModal from "../../components/player/CouponModal";

export default function PromoPage() {

    const [showCoupon, setShowCoupon] = useState(false);

    const promos = [

        {
            id:1,
            title:"Welcome Bonus",
            bonus:"100%",
            description:"Get 100% on your first deposit.",
            color:"#00d48a"
        },

        {
            id:2,
            title:"Weekend Cashback",
            bonus:"15%",
            description:"Receive cashback every Sunday.",
            color:"#0ea5e9"
        },

        {
            id:3,
            title:"VIP Rewards",
            bonus:"VIP",
            description:"Exclusive rewards for active players.",
            color:"#ffb000"
        }

    ];

    return(

        <div className="promo-page">

            <div className="promo-header">

                <h1>Promotions</h1>

                <p>
                    Exclusive offers for Arkey players
                </p>

            </div>

            <button
                className="coupon-button"
                onClick={()=>setShowCoupon(true)}
            >
                Redeem Coupon
            </button>

            <div className="promo-list">

                {promos.map((promo)=>

                    <PromoCard
                        key={promo.id}
                        promo={promo}
                    />

                )}

            </div>

            <CouponModal

                open={showCoupon}

                onClose={()=>setShowCoupon(false)}

            />

        </div>

    );

}