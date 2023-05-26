import React from "react";
import { useUserData } from "../../../contexts/UserDataProvider";

export const Orders = () => {
  const { userDataState } = useUserData();
  return !userDataState.cartProducts?.length ? (
    <div>No Orders</div>
  ) : (
    <div>Some Orders</div>
  );
};
