import React, { useState } from "react";
import { useAddress } from "../../contexts/AddressProvider";
import { useUserData } from "../../contexts/UserDataProvider";
import { AddressModal } from "./AddressModal/AddressModal";
import "./Checkout.css";
import { removeAddressService } from "../../services/address-services/removeAddressService";
import { useAuth } from "../../contexts/AuthProvider";

export const Checkout = () => {
  const { auth } = useAuth();
  const { userDataState, dispatch } = useUserData();

  const {
    setAddressForm,
    isAddressModalOpen,
    setIsAddressModalOpen,
    setIsEdit,
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

  const { totalDiscountedPrice, totalOriginalPrice } = useUserData();

  const [deliveryAddressIndex, setDeliveryAddressIndex] = useState(0);

  return (
    <div>
      <div>Checkout</div>
      <div className="checkbox-container">
        <div className="address-container">
          {userDataState.addressList?.map((add, index) => {
            const { name, street, city, state, country, pincode, phone, _id } =
              add;

            return (
              <div key={_id} className="address-card">
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
                  <button onClick={() => editButtonHandler(add)}>Edit</button>
                  <button onClick={() => deleteAddress(add)}>Delete</button>
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
          <div className="product-details-container">
            <h3>Order Details</h3>
            <div className="ordered-products-container">
              {userDataState.cartProducts?.map(
                ({ id, name, qty, discounted_price }) => (
                  <div key={id} className="ordered-product-card">
                    <span>{name}</span>
                    <span>{qty}</span>
                    <span>${discounted_price}</span>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="billing-container">
            <h3>Billing</h3>
            <div price-details-container>
              <div>
                <span className="subtotal">Subtotal</span>
                <span>{totalOriginalPrice}</span>
              </div>

              <div>
                <span className="subtotal">Discount</span>
                <span>{totalOriginalPrice - totalDiscountedPrice}</span>
              </div>

              <div>
                <span>Total before shipping</span>
                <span>{totalDiscountedPrice}</span>
              </div>
              <div>
                <span>Shipping</span>
                <span>{}</span>
              </div>
              <div>
                <span>Total</span>
                <span>{}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
