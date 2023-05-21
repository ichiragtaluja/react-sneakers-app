import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useUserData } from "../contexts/UserDataProvider";
import { removeFromWishlistService } from "../services/wishlist-services/removeFromWishlist";

export const Wishlist = () => {
  const { auth } = useAuth();
  const {
    userDataState,
    dispatch,
    addToCartHandler,
    removeFromWishlistHandler, isProductInCart
  } = useUserData();

  const navigate = useNavigate();

  

  return (
    <div>
      <h1>Wishlist</h1>
      <div className="wishlist-products-container">
        {userDataState.wishlistProducts?.map((product) => (
          <div className="wishlist-card" key={product.name}>
            <div className="wishlist-description">{product.name}</div>
            <div wishlist-btn-container>
              <button
                onClick={() => {
                  !isProductInCart(product)
                    ? addToCartHandler(product)
                    : navigate("/cart");
                }}
              >
                {!isProductInCart(product) ? "Add to cart" : "Go to cart"}
              </button>
              <button onClick={() => removeFromWishlistHandler(product)}>
                remove from wishlist
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
