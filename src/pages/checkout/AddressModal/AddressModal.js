import "./AddressModal.css";

import React from "react";
import { useAddress } from "../../../contexts/AddressProvider";
import { useState } from "react";

export const AddressModal = () => {
  const dummyAddress = {
    name: "Ritika Dhanda",
    street: "abc",
    city: "Pickle Lake",
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
    addresses,
    setAddresses,
  } = useAddress();
  return (
    <div className="address-modal-container">
      <div className="address-input-container">
        <h1>AddressModal</h1>
        <form
          onSubmit={(e) => {
            if (!editAddressIndex.length) {
              e.preventDefault();
              setAddresses([...addresses, { ...addressForm }]);
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

              setAddresses(
                addresses.map((add, index) =>
                  index !== editAddressIndex[0] ? add : addressForm
                )
              );
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
              setEditAddressIndex([]);
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
            placeholder="name"
          />
          <input
            required
            value={addressForm.street}
            onChange={(e) =>
              setAddressForm({ ...addressForm, street: e.target.value })
            }
            placeholder="street"
          />
          <input
            name="city"
            required
            value={addressForm.city}
            onChange={(e) =>
              setAddressForm({ ...addressForm, city: e.target.value })
            }
            placeholder="city"
          />
          <input
            name="state"
            required
            value={addressForm.state}
            onChange={(e) =>
              setAddressForm({ ...addressForm, state: e.target.value })
            }
            placeholder="state"
          />
          <input
            name="country"
            value={addressForm.country}
            required
            onChange={(e) =>
              setAddressForm({ ...addressForm, country: e.target.value })
            }
            placeholder="country"
          />
          <input
            name="pincode"
            value={addressForm.pincode}
            required
            onChange={(e) =>
              setAddressForm({ ...addressForm, pincode: e.target.value })
            }
            placeholder="pincode"
          />
          <input
            name="phone"
            value={addressForm.phone}
            required
            onChange={(e) =>
              setAddressForm({ ...addressForm, phone: e.target.value })
            }
            placeholder="phone"
          />
          <input type="submit" value="Save" />
        </form>

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
  );
};
