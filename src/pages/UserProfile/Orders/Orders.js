import React from "react";
import { useUserData } from "../../../contexts/UserDataProvider";
import "./Orders.css";

export const Orders = () => {
  const { userDataState } = useUserData();
  return !userDataState.cartProducts?.length ? (
    <div className="orders-container">No Orders</div>
  ) : (
    <div className="orders-container">Some Orders</div>
  );
};
