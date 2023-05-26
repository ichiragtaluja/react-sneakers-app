import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider";
import { useUserData } from "../../contexts/UserDataProvider";
import { removeFromWishlistService } from "../../services/wishlist-services/removeFromWishlist";
import { BsFillStarFill } from "react-icons/bs";
import "./Wishlist.css";

export const Wishlist = () => {
  const { auth } = useAuth();
  const {
    userDataState,
    dispatch,
    addToCartHandler,
    removeFromWishlistHandler,
    isProductInCart,
  } = useUserData();

  const navigate = useNavigate();

  return (
    <div>
      <h1>Wishlist</h1>
      <div className="wishlist-products-container">
        {userDataState.wishlistProducts?.map((product) => (
          <div className="wishlist-card" key={product.name}>
            <div>
              <img className="img-container" src={product.img} />
            </div>

            {/* <div className="wishlist-description">
              <p>{product.name}</p>
            </div> */}

            <div className="product-card-details">
              <h3>{product.name}</h3>
              <p className="ratings">
                {product.rating}
                <BsFillStarFill color="orange" /> ({product.reviews} reviews){" "}
              </p>
              <div className="price-container">
                <p className="original-price">${product.original_price}</p>
                <p className="discount-price">${product.discounted_price}</p>
              </div>

              <p>Gender: {product.category_name}</p>
              <div className="info">
                {!product.is_stock && (
                  <p className="out-of-stock">Out of stock</p>
                )}
                {product.trending && <p className="trending">Trending</p>}
              </div>
            </div>

            <div className="wishlist-btn-container">
              <button
                className="cart-wishlist-btn"
                onClick={() => {
                  !isProductInCart(product)
                    ? addToCartHandler(product)
                    : navigate("/cart");
                }}
              >
                {!isProductInCart(product) ? "Add to cart" : "Go to cart"}
              </button>
              <button
                className="remove-from-wishlist-btn"
                onClick={() => removeFromWishlistHandler(product)}
              >
                Remove from wishlist
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
