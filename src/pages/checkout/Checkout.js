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
  console.log("addressList", userDataState.addressList);

  const {
    setAddressForm,
    isAddressModalOpen,
    setIsAddressModalOpen,
    setIsEdit,
  } = useAddress();

  const deleteAddress = async (address) => {
    try {
      const response = await removeAddressService(address, auth.token);
      if (response.status === 200) {
        dispatch({ type: "SET_ADDRESS", payload: response.data.addressList });
      }
    } catch (error) {}
  };

  const editButtonHandler = (address) => {
    setIsAddressModalOpen(true);
    setAddressForm(address);
    setIsEdit(true);
  };

  const { totalDiscountedPrice, totalOriginalPrice } = useUserData();

  const [deliveryAddressIndex, setDeliveryAddressIndex] = useState(0);

  return (
    <div>
      <div>Checkout</div>
      <div className="checkout-container">
        <div className="address-container">
          {userDataState.addressList?.map((address, index) => {
            const { name, street, city, state, country, pincode, phone, _id } =
              address;

            return (
              <div key={_id} className="address-card">
                <input
                  checked={index === deliveryAddressIndex}
                  onChange={() => {
                    setDeliveryAddressIndex(index);
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
                    <button onClick={() => editButtonHandler(address)}>
                      Edit
                    </button>
                    <button onClick={() => deleteAddress(address)}>
                      Delete
                    </button>
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
        <div className="order-details-container">
          <div className="product-details-container">
            <h3>Purchased Items</h3>
            <div className="ordered-products-container">
              {userDataState.cartProducts?.map(
                ({ id, img, name, qty, discounted_price }) => (
                  <div key={id} className="ordered-product-card">
                    <img src={img} />
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
            <div className="price-details-container">
              <div>
                <span className="subtotal">Subtotal</span>
                <span>${userDataState.orderDetails?.cartItemsTotal}</span>
              </div>

              <div>
                <span className="subtotal">Discount</span>
                <span>
                  $
                  {userDataState.orderDetails?.cartItemsTotal -
                    userDataState.orderDetails?.cartItemsDiscountTotal}
                </span>
              </div>

              {/* <div>
                <span>Total before shipping</span>
                <span>{totalDiscountedPrice}</span>
              </div> */}
              <div>
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div>
                <span>Total</span>
                <span>
                  ${userDataState.orderDetails?.cartItemsDiscountTotal}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
