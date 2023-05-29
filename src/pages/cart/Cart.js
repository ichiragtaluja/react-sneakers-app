import { useState } from "react";
import "./Cart.css";

import { CartListing } from "./components/CartListing/CartListing";
import { Coupons } from "./components/Coupons/Coupons";
import { CartAmountSummary } from "./components/CartAmountSummary/CartAmountSummary";

export const Cart = () => {
  const [couponSelected, setCouponSelected] = useState([]);

  return (
    <div>
      <h1>Cart</h1>
      <div className="cart-container">
        <CartListing />
        <div>
          <Coupons
            couponSelected={couponSelected}
            setCouponSelected={setCouponSelected}
          />
          <CartAmountSummary couponSelected={couponSelected} />
        </div>
      </div>
    </div>
  );
};
