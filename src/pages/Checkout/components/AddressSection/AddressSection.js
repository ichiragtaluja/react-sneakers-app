import "./AddressSection.css";
import React from "react";

import { useAddress } from "../../../../contexts/AddressProvider";
import { useUserData } from "../../../../contexts/UserDataProvider";
import { AddressModal } from "../AddressModal/AddressModal";

export const AddressSection = () => {
  const { userDataState, dispatch } = useUserData();

  const {
    setAddressForm,
    isAddressModalOpen,
    setIsAddressModalOpen,
    setIsEdit,
    deleteAddress,
  } = useAddress();

  const editButtonHandler = (address) => {
    setIsAddressModalOpen(true);
    setAddressForm(address);
    setIsEdit(true);
  };

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
            <label for={_id}>
              <p className="name">{name}</p>
              <p className="address">
                {street}, {city},{state}, {country} {pincode} - {phone}
              </p>
              <div className="address-btns">
                <button onClick={() => editButtonHandler(address)}>Edit</button>
                <button onClick={() => deleteAddress(address)}>Delete</button>
              </div>
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
