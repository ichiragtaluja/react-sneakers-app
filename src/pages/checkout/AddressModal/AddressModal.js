import "./AddressModal.css";
import React from "react";
import { useAddress } from "../../../contexts/AddressProvider";
import { useState } from "react";
import { addAddressService } from "../../../services/address-services/addAddressService";
import { useAuth } from "../../../contexts/AuthProvider";
import { useUserData } from "../../../contexts/UserDataProvider";
import { updateAddressService } from "../../../services/address-services/updateAddressService";
import { removeAddressService } from "../../../services/address-services/removeAddressService";

export const AddressModal = () => {
  const { auth } = useAuth();
  const { userDataState, dispatch } = useUserData();

  const dummyAddress = {
    name: "Chirag",
    street: "abc",
    city: "Toronto",
    state: "Ontario",
    country: "Canada",
    pincode: "135001",
    phone: "+1789345823",
  };

  const {
    editAddressIndex,
    setEditAddressIndex,
    setIsAddressModalOpen,
    addressForm,
    setAddressForm,
    isEdit,
    setIsEdit,
  } = useAddress();

  const updateAddress = async (address) => {
    const response = await updateAddressService(address, auth.token);
    dispatch({ type: "SET_ADDRESS", payload: response.data.addressList });
  };

  const addAddress = async (address) => {
    const response = await addAddressService(address, auth.token);

    dispatch({ type: "SET_ADDRESS", payload: response.data.addressList });
  };

  return (
    <div className="address-modal-container">
      <div className="address-input-container">
        <h1>Address Form</h1>
        <form
          onSubmit={(e) => {
            if (!isEdit) {
              e.preventDefault();
              addAddress(addressForm);
              setAddressForm({
                name: "",
                street: "",
                city: "",
                state: "",
                country: "",
                pincode: "",
                phone: "",
              });
              setIsAddressModalOpen(false);
            } else {
              e.preventDefault();
              updateAddress(addressForm);
              setAddressForm({
                name: "",
                street: "",
                city: "",
                state: "",
                country: "",
                pincode: "",
                phone: "",
              });
              setIsAddressModalOpen(false);
              setIsEdit(false);
            }
          }}
          className="input-containter"
        >
          <input
            name="name"
            value={addressForm.name}
            required
            onChange={(e) =>
              setAddressForm({ ...addressForm, name: e.target.value })
            }
            placeholder="Enter Name"
          />
          <input
            required
            value={addressForm.street}
            onChange={(e) =>
              setAddressForm({ ...addressForm, street: e.target.value })
            }
            placeholder="Enter Street"
          />
          <input
            name="city"
            required
            value={addressForm.city}
            onChange={(e) =>
              setAddressForm({ ...addressForm, city: e.target.value })
            }
            placeholder="Enter City"
          />
          <input
            name="state"
            required
            value={addressForm.state}
            onChange={(e) =>
              setAddressForm({ ...addressForm, state: e.target.value })
            }
            placeholder="Enter State"
          />
          <input
            name="country"
            value={addressForm.country}
            required
            onChange={(e) =>
              setAddressForm({ ...addressForm, country: e.target.value })
            }
            placeholder="Enter Country"
          />
          <input
            name="pincode"
            value={addressForm.pincode}
            required
            onChange={(e) =>
              setAddressForm({ ...addressForm, pincode: e.target.value })
            }
            placeholder="Enter Pincode"
          />
          <input
            name="phone"
            value={addressForm.phone}
            required
            onChange={(e) =>
              setAddressForm({ ...addressForm, phone: e.target.value })
            }
            placeholder="Enter Phone"
          />
          <input className="submit" type="submit" value="Save" />
        </form>
        <div className="btn-container">
          <button onClick={() => setIsAddressModalOpen(false)}>Cancel</button>
          <button
            onClick={() => {
              setAddressForm({ ...dummyAddress });

              // setAddresses([...addresses, { ...dummyAddress }]);
            }}
          >
            Add Dummy Data
          </button>
        </div>
      </div>
    </div>
  );
};
