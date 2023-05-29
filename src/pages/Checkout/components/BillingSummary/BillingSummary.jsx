import React from "react";
import "./BillingSummary.css";
import { useUserData } from "../../../../contexts/UserDataProvider";

export const BillingSummary = () => {
  const { userDataState } = useUserData();
  return (
    <div className="billing-container">
      <h3>Billing</h3>
      <div className="price-details-container">
        <div>
          <span className="subtotal">Subtotal</span>
          <span>${userDataState.orderDetails?.cartItemsTotal}</span>
        </div>

        <div>
          <span className="subtotal">Discount</span>
          <span>
            $
            {(
              userDataState.orderDetails?.cartItemsTotal -
              userDataState.orderDetails?.cartItemsDiscountTotal
            ).toFixed(2)}
          </span>
        </div>

        <div>
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <div>
          <span>Total</span>
          <span>${userDataState.orderDetails?.cartItemsDiscountTotal}</span>
        </div>
      </div>
    </div>
  );
};
