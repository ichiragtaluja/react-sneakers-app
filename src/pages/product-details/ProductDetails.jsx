import "./ProductDetails.css";
import { BsFillStarFill } from "react-icons/bs";
import Tilt from "react-parallax-tilt";
import React from "react";
import { useParams } from "react-router-dom";

import { addToWishlistService } from "../../services/wishlist-services/addToWishlistService";

import { useData } from "../../contexts/DataProvider";
import { addToCartService } from "../../services/cart-services/addToCartService";
import { useAuth } from "../../contexts/AuthProvider";
import { useUserData } from "../../contexts/UserDataProvider";

export const ProductDetails = () => {
  const { state } = useData();
  const { productId } = useParams();

  const { dispatch } = useUserData();

  const { auth } = useAuth();

  const addToCartHandler = async (product) => {
    const response = await addToCartService(product, auth.token);
    dispatch({ type: "SET_CART", payload: response.data.cart });
  };

  const addToWishlistHandler = async (product) => {
    const response = await addToWishlistService(product, auth.token);
    dispatch({ type: "SET_WISHLIST", payload: response.data.wishlist });
  };

  const selectedProduct = state.allProductsFromApi?.find(
    ({ id }) => Number(id) === Number(productId)
  );

  // const {
  //   // _id,
  //   name,
  //   original_price,
  //   discounted_price,
  //   category_name,
  //   is_stock,
  //   rating,
  //   reviews,
  //   description,
  //   trending,
  //   size,
  //   img,
  // } = selectedProduct;

  return (
    <>
      <div className="products-page-container">
        <Tilt
          tiltEnable={false}
          scale={1.05}
          transitionSpeed={1000}
          className="product-details-image"
        >
          {" "}
          <img src={selectedProduct?.img} />
        </Tilt>

        <div className="product-details-description">
          <h1 className="product-name">{selectedProduct?.name}</h1>

          <div className="ratings-reviews">
            <span></span>
            <span>{selectedProduct?.rating}</span>{" "}
            <BsFillStarFill color={"orange"} />
            <span>
              <span className="review">
                ({selectedProduct?.reviews}) reviews{" "}
              </span>
            </span>
          </div>

          <div className="product-price-container">
            <span className="product-original-price">
              ${selectedProduct?.original_price}{" "}
            </span>
            <span className="product-discount-price">
              {" "}
              ${selectedProduct?.discounted_price}
            </span>
          </div>

          <p className="description-container">
            <span>Description</span>: {selectedProduct?.description}
          </p>

          <span className="gender-container">
            <span>Gender</span>: {selectedProduct?.category_name}
          </span>
          <p className="size-container">
            <span>Size</span>: {selectedProduct?.size}
          </p>

          <div className="tags">
            {!selectedProduct?.is_stock && (
              <span className="out-of-stock">
                {selectedProduct?.is_stock ? "In Stock" : "Out of stock"}
              </span>
            )}
            {selectedProduct?.trending && (
              <span className="trending">
                {selectedProduct?.trending ? "Trending" : ""}
              </span>
            )}
          </div>
          <div className="product-card-buttons-container">
            <button
              onClick={() => addToCartHandler(selectedProduct)}
              className="add-to-cart-btn"
            >
              Add to cart
            </button>
            <button
              onClick={() => addToWishlistHandler(selectedProduct)}
              className="add-to-wishlist-btn"
            >
              Add to wishlist
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
