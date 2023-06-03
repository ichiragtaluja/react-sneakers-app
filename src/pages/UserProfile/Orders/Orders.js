import React from "react";
import { useUserData } from "../../../contexts/UserDataProvider";
import "./Orders.css";

export const Orders = () => {
  const { userDataState } = useUserData();

  return !userDataState.orders?.length ? (
    <div className="orders-container">No Orders</div>
  ) : (
    <div className="orders-container">
      {userDataState.orders?.map(
        ({
          amountPaid,
          deliveryAddress,
          orderId,
          orderedProducts,
          paymentId,
        }) => (
          <div key={orderId} className="ordered-items-card">
            <div className="order-id-container">
              <span>Order ID: </span>
              <span>{orderId}</span>
            </div>
            <div className="payment-id-container">
              <span>Payment ID: </span>
              <span>{paymentId}</span>
            </div>
            <div className="price-container">
              <span>Amount: </span>
              <span>${amountPaid}</span>
            </div>
            <div className="price-container">
              <span>Delivery-Address:</span>
              <span>
                {deliveryAddress.street} {deliveryAddress.state}{" "}
                {deliveryAddress.country}
              </span>
            </div>
            <div className="products-container">
              {orderedProducts.map(
                ({ id, img, name, discounted_price, qty }) => (
                  <div className="products-card" key={id}>
                    <img src={img} alt={name} />
                    <div className="description">
                      <span className="name">Name: {name}</span>
                      <span className="qty">Qty: {qty}</span>
                      <span className="price">Price: ${discounted_price}</span>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        )
      )}
    </div>
  );
};
