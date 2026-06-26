import React from "react";

export default function PromoCard({ promo }) {

    return(

        <div
            className="promo-card"
            style={{
                borderColor:promo.color
            }}
        >

            <div
                className="promo-badge"
                style={{
                    background:promo.color
                }}
            >
                {promo.bonus}
            </div>

            <h3>{promo.title}</h3>

            <p>{promo.description}</p>

            <button>

                Claim Now

            </button>

        </div>

    );

}