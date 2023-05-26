import React from "react";
import { addAddressHandler } from "../../../backend/controllers/AddressController";
import { useAddress } from "../../../contexts/AddressProvider";
import { useUserData } from "../../../contexts/UserDataProvider";
import { AddressModal } from "../../checkout/AddressModal/AddressModal";

export const Addresses = () => {
  const { userDataState } = useUserData();
  const {
    addressForm,
    setAddressForm,
    isAddressModalOpen,
    setIsAddressModalOpen,
  } = useAddress();

  const addAddressHandler = () => {
    setIsAddressModalOpen(true);
  };
  return (
    <div>
      <button onClick={addAddressHandler}>Add new Address</button>
      {userDataState.addressList.map((address) => {
        const { name, street, city, state, country, pincode, phone } = address;
        return (
          <div>
            <p>{name}</p>
            <p>
              {street} {city} {state} {country} {pincode} {phone}
            </p>
          </div>
        );
      })}
      {isAddressModalOpen && <AddressModal />}
    </div>
  );
};
