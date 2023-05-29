import "./DeliveryAddress.css";
import { useUserData } from "../../../../contexts/UserDataProvider";

import React from "react";

export const DeliveryAddress = () => {
  const { userDataState } = useUserData();
  return (
    <div className="delivery-address-container">
      <h3>Delivering To</h3>
      <div className="delivery-address-description">
        <span className="name">
          {userDataState.orderDetails?.orderAddress?.name}
        </span>
        <span className="address">
          {userDataState.orderDetails?.orderAddress?.street},{" "}
          {userDataState.orderDetails?.orderAddress?.city},{" "}
          {userDataState.orderDetails?.orderAddress?.state},{" "}
          {userDataState.orderDetails?.orderAddress?.country},{" "}
          {userDataState.orderDetails?.orderAddress?.pincode}
        </span>
        <span className="contact">
          Contact: {userDataState.orderDetails?.orderAddress?.phone}
        </span>
      </div>
    </div>
  );
};
