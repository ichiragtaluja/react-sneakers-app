import React from "react";
import { useAddress } from "../../../contexts/AddressProvider";
import { useUserData } from "../../../contexts/UserDataProvider";
import { AddressModal } from "../../checkout/AddressModal/AddressModal";
import { removeAddressService } from "../../../services/address-services/removeAddressService";
import { useAuth } from "../../../contexts/AuthProvider";
import "./Addresses.css";

export const Addresses = () => {
  const { auth } = useAuth();

  const { userDataState, dispatch } = useUserData();
  const {
    setIsEdit,

    setAddressForm,
    isAddressModalOpen,
    setIsAddressModalOpen,
  } = useAddress();

  const deleteAddress = async (address) => {
    const response = await removeAddressService(address, auth.token);
    dispatch({ type: "SET_ADDRESS", payload: response.data.addressList });
  };

  const editButtonHandler = (add) => {
    setIsAddressModalOpen(true);
    setAddressForm(add);
    setIsEdit(true);
  };

  const addAddressHandler = () => {
    setIsAddressModalOpen(true);
  };
  return (
    <div className="address-section-container">
      <div className="add-address-btn-container">
        <button onClick={addAddressHandler}>New Address</button>
      </div>
      <div className="profile-address-container">
        {userDataState.addressList.map((address) => {
          const { name, street, city, state, country, pincode, phone, _id } =
            address;
          return (
            <div className="address-card" key={_id}>
              <p className="name">{name}</p>
              <p className="address">
                <span>Address:</span> {street}, {city}, {state}, {country} -{" "}
                {pincode}
              </p>
              <p className="phone">
                <span>Phone: </span>
                {phone}
              </p>
              <div className="address-btn-container">
                <button onClick={() => editButtonHandler(address)}>Edit</button>
                <button onClick={() => deleteAddress(address)}>Delete</button>
              </div>
            </div>
          );
        })}
      </div>

      {isAddressModalOpen && <AddressModal />}
    </div>
  );
};
