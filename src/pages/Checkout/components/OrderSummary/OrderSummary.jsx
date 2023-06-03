import "./OrderSummary.css";
import React from "react";
import { CartProductsSummary } from "../CartProductsSummary/CartProductsSummary";
import { BillingSummary } from "../BillingSummary/BillingSummary";
import { DeliveryAddress } from "../DeliveryAddress/DeliveryAddress";
import { useUserData } from "../../../../contexts/UserDataProvider";

export const OrderSummary = () => {
  const { userDataState } = useUserData();
  return (
    <div className="order-details-container">
      <CartProductsSummary />
      <BillingSummary />
      {userDataState.orderDetails.orderAddress ? (
        <DeliveryAddress />
      ) : (
        <div className="no-address">
          Please provide/select an address to proceed!
        </div>
      )}
    </div>
  );
};
