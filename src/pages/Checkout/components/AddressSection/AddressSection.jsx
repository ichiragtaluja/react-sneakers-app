import "./AddressSection.css";
import React from "react";

import { useAddress } from "../../../../contexts/AddressProvider";
import { useUserData } from "../../../../contexts/UserDataProvider";
import { AddressModal } from "../AddressModal/AddressModal";

export const AddressSection = () => {
  const { userDataState, dispatch } = useUserData();

  const { isAddressModalOpen, setIsAddressModalOpen } = useAddress();

  return (
    <div className="address-container">
      {userDataState.addressList?.map((address, index) => {
        const { name, street, city, state, country, pincode, phone, _id } =
          address;

        return (
          <div key={_id} className="address-card">
            <input
              checked={_id === userDataState.orderDetails?.orderAddress?._id}
              onChange={() => {
                dispatch({
                  type: "SET_ORDER",
                  payload: { orderAddress: address },
                });
              }}
              name="address"
              id={_id}
              type="radio"
            />
            <label htmlFor={_id}>
              <p className="name">{name}</p>
              <p className="address">
                {street}, {city},{state}, {country} {pincode} - {phone}
              </p>
            </label>
          </div>
        );
      })}
      <div className="add-new-address-btn-container">
        <button
          className="add-new-address-btn"
          onClick={() => setIsAddressModalOpen(true)}
        >
          Add New Address
        </button>
      </div>

      {isAddressModalOpen && <AddressModal />}
    </div>
  );
};
