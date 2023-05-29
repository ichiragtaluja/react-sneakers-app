import React from "react";
import { useAddress } from "../../../contexts/AddressProvider";
import { useUserData } from "../../../contexts/UserDataProvider";
import { removeAddressService } from "../../../services/address-services/removeAddressService";
import { useAuth } from "../../../contexts/AuthProvider";
import "./Addresses.css";
import { RiAddFill } from "react-icons/ri";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { AddressModal } from "../../Checkout/components/AddressModal/AddressModal";

export const Addresses = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { auth } = useAuth();

  const { userDataState, dispatch } = useUserData();
  const {
    setIsEdit,
    setAddressForm,
    isAddressModalOpen,
    setIsAddressModalOpen,
  } = useAddress();

  const deleteAddress = async (address) => {
    try {
      setLoading(true);
      setError("");
      const response = await removeAddressService(address, auth.token);
      if (response.status === 200) {
        toast.success(`${address.name}'s address successfully deleted!`);
        dispatch({ type: "SET_ADDRESS", payload: response.data.addressList });
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
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
        <button onClick={addAddressHandler}>
          <RiAddFill className="plus" />
          New Address
        </button>
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
