import React from "react";
import { MdDelete } from "react-icons/md";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import "./CartListing.css";

import { useUserData } from "../../../../contexts/UserDataProvider";

export const CartListing = () => {
  const {
    userDataState,
    isProductInWishlist,
    removeFromCartHandler,
    wishlistHandler,
    cartCountHandler,
    cartLoading,
  } = useUserData();

  return (
    <div className="cart-products-container">
      {userDataState.cartProducts.map((product) => (
        <div className="cart-product-card" key={product.name}>
          <div>
            <img className="cart-img" src={product.img} />
          </div>
          <div className="product-description">
            <h3>{product.name}</h3>
            <p>Price:${product.discounted_price}</p>
            <p>Size: {product.size}</p>
          </div>
          <div className="button-section">
            <div className="count-btn-container">
              <button
                disabled={cartLoading}
                className="counter-btn"
                onClick={() => cartCountHandler(product, "decrement")}
              >
                -
              </button>
              <span>{product.qty}</span>
              <button
                disabled={cartLoading}
                className="counter-btn"
                onClick={() => cartCountHandler(product, "increment")}
              >
                +
              </button>
            </div>
            <div className="secondary-btn-section">
              <MdDelete
                size={25}
                onClick={() => removeFromCartHandler(product)}
              />

              {!isProductInWishlist(product) ? (
                <AiOutlineHeart
                  size={25}
                  onClick={() => wishlistHandler(product)}
                />
              ) : (
                <AiFillHeart
                  size={25}
                  onClick={() => wishlistHandler(product)}
                />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
