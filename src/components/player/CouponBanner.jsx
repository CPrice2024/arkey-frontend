import React from "react";
import {
  Gift,
  ChevronRight
} from "lucide-react";

export default function CouponBanner({ onClick }) {

  return (

    <div
      className="coupon-banner"
      onClick={onClick}
    >

      <div className="coupon-left">

        <div className="coupon-icon">
          <Gift size={26} />
        </div>

        <div>

          <h3>
            Have a Coupon?
          </h3>

          <p>
            Redeem your bonus code now
          </p>

        </div>

      </div>

      <ChevronRight size={24} />

    </div>

  );

}