import React,{useState} from "react";

export default function CouponModal({

    open,

    onClose

}){

    const [coupon,setCoupon]=useState("");

    if(!open) return null;

    const redeem=()=>{

        alert(
            `Coupon "${coupon}" redeemed!`
        );

        setCoupon("");

        onClose();

    };

    return(

        <>

        <div
            className="drawer-overlay"
            onClick={onClose}
        />

        <div className="coupon-modal">

            <h2>

                Redeem Coupon

            </h2>

            <input

                placeholder="Enter coupon code"

                value={coupon}

                onChange={(e)=>

                    setCoupon(e.target.value)

                }

            />

            <button onClick={redeem}>

                Redeem

            </button>

        </div>

        </>

    );

}