import { useState } from "react";
import "./Cart.css";

import { CartListing } from "./components/CartListing/CartListing";
import { Coupons } from "./components/Coupons/Coupons";
import { CartAmountSummary } from "./components/CartAmountSummary/CartAmountSummary";
import { useUserData } from "../../contexts/UserDataProvider";
import { useNavigate } from "react-router-dom";

export const Cart = () => {
  const [couponSelected, setCouponSelected] = useState([]);
  const { userDataState, loading } = useUserData();
  const navigate = useNavigate();

  return userDataState.cartProducts.length ? (
    <div>
      <h1 className="page-heading">Cart</h1>
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
  ) : (
    <div className="no-items-container">
      <h2 className="page-heading">Cart is Empty!</h2>
      <button
        className="explore-btn"
        onClick={() => navigate("/product-listing")}
      >
        Explore
      </button>
    </div>
  );
};
