import React, { useState } from "react";
import { useAddress } from "../../contexts/AddressProvider";
import { useUserData } from "../../contexts/UserDataProvider";
import { AddressModal } from "./AddressModal/AddressModal";
import "./Checkout.css";
import { removeAddressService } from "../../services/address-services/removeAddressService";
import { useAuth } from "../../contexts/AuthProvider";
import { toast } from "react-hot-toast";

export const Checkout = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("false");
  const { auth } = useAuth();
  const { userDataState, dispatch } = useUserData();

  const {
    setAddressForm,
    isAddressModalOpen,
    setIsAddressModalOpen,
    setIsEdit,
  } = useAddress();

  const deleteAddress = async (address) => {
    try {
      setLoading(true);
      setError("");
      const response = await removeAddressService(address, auth.token);
      if (response.status === 200) {
        setLoading(false);
        toast.success(`${address.name}'s address deleted successfully!`);
        dispatch({ type: "SET_ADDRESS", payload: response.data.addressList });
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
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
      <h1 className="page-heading">Checkout!</h1>
      <div className="checkout-container">
        <div className="address-container">
          {userDataState.addressList?.map((address, index) => {
            const { name, street, city, state, country, pincode, phone, _id } =
              address;

            return (
              <div key={_id} className="address-card">
                <input
                  checked={
                    _id === userDataState.orderDetails?.orderAddress?._id
                  }
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

          <div className="delivery-address-container">
            <h3>Delivering To</h3>
            <div className="delivery-address-description">
              <span className="name">
                {userDataState.orderDetails?.orderAddress.name}
              </span>
              <span className="address">
                {userDataState.orderDetails?.orderAddress.street},{" "}
                {userDataState.orderDetails?.orderAddress.city},{" "}
                {userDataState.orderDetails?.orderAddress.state},{" "}
                {userDataState.orderDetails?.orderAddress.country},{" "}
                {userDataState.orderDetails?.orderAddress.pincode}
              </span>
              <span className="contact">
                Contact: {userDataState.orderDetails?.orderAddress.phone}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
