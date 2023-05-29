import "./CartProductsSummary.css";

import React from "react";
import { useUserData } from "../../../../contexts/UserDataProvider";

export const CartProductsSummary = () => {
  const { userDataState } = useUserData();
  return (
    <div className="product-details-container">
      <h3>Purchased Items</h3>
      <div className="ordered-products-container">
        {userDataState.cartProducts?.map(
          ({ id, img, name, qty, discounted_price }) => (
            <div key={id} className="ordered-product-card">
              <img src={img} />
              <span>{name}</span>
              <span>{qty}</span>
              <span>${discounted_price}</span>
            </div>
          )
        )}
      </div>
    </div>
  );
};
