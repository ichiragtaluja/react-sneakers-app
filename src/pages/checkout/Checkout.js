import React, { useState } from "react";
import { AddressProvider, useAddress } from "../../contexts/AddressProvider";
import { AddressModal } from "./AddressModal/AddressModal";
import "./Checkout.css";

export const Checkout = () => {
  const {
    addressForm,
    setAddressForm,
    addresses,
    setAddresses,
    isAddressModalOpen,
    setIsAddressModalOpen,
    editAddressIndex,
    setEditAddressIndex,
  } = useAddress();

  const [deliveryAddressIndex, setDeliveryAddressIndex] = useState(0);

  return (
    <div>
      <div>Checkout</div>
      <div className="checkbox-container">
        <div className="address-container">
          {addresses?.map((add, index) => {
            const { name, street, city, state, country, pincode, phone } = add;

            return (
              <div key={name} className="address-card">
                <input
                  checked={index === deliveryAddressIndex}
                  onChange={() => {
                    setDeliveryAddressIndex(index);
                  }}
                  name="address"
                  id={name}
                  type="radio"
                />
                <label for={name}>
                  <p>
                    {name}, {street}, {city},{state}, {country} {pincode} -{" "}
                    {phone}
                  </p>
                  <button
                    onClick={() => {
                      setIsAddressModalOpen(true);
                      setAddressForm(add);
                      setEditAddressIndex([index]);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() =>
                      setAddresses(
                        addresses.filter((add, ind) => ind !== index)
                      )
                    }
                  >
                    Delete
                  </button>
                </label>
              </div>
            );
          })}
          <button onClick={() => setIsAddressModalOpen(true)}>
            Add New Address
          </button>
          {isAddressModalOpen && <AddressModal />}
        </div>
        <div className="order-details-container">
          <div>
            <h3>Order Details</h3>
            <div className="ordered-products-container"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
