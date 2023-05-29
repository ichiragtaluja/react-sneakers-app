import "./ProductDetails.css";
import { BsFillStarFill } from "react-icons/bs";
import Tilt from "react-parallax-tilt";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

import { useLocation } from "react-router-dom";

import { addToWishlistService } from "../../services/wishlist-services/addToWishlistService";

import { useData } from "../../contexts/DataProvider";
import { addToCartService } from "../../services/cart-services/addToCartService";
import { useAuth } from "../../contexts/AuthProvider";
import { useUserData } from "../../contexts/UserDataProvider";
import { toast } from "react-hot-toast";
import { removeFromWishlistService } from "../../services/wishlist-services/removeFromWishlist";

export const ProductDetails = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { state } = useData();
  const { productId } = useParams();
  const location = useLocation();

  const { dispatch, userDataState } = useUserData();

  const { auth } = useAuth();
  const navigate = useNavigate();

  const isProductInCart = (product) => {
    const found = userDataState.cartProducts.find(
      (item) => item._id === product._id
    );
    return found ? true : false;
  };

  const isProductInWishlist = (product) => {
    const found = userDataState.wishlistProducts.find(
      (item) => item._id === product._id
    );
    return found ? true : false;
  };

  const addToCartHandler = async (product) => {
    if (auth.isAuth) {
      if (!isProductInCart(product)) {
        try {
          setLoading(true);
          setError("");
          const response = await addToCartService(product, auth.token);
          if (response.status === 201) {
            setLoading(false);
            toast.success(`${product.name} added to cart successfully!`);
            dispatch({ type: "SET_CART", payload: response.data.cart });
          }
        } catch (error) {
          setLoading(false);
          console.log(error);
        } finally {
          setLoading(false);
        }
      } else {
        navigate("/cart");
      }
    } else {
      toast("Please login first!");
      navigate("/login", { state: { from: location } });
    }
  };

  const wishlistHandler = async (product) => {
    if (auth.isAuth) {
      if (!isProductInWishlist(product)) {
        try {
          setLoading(true);
          setError("");
          const response = await addToWishlistService(product, auth.token);
          if (response.status === 201) {
            setLoading(false);
            toast.success(
              `${product.name} added to the wishlist successfully!`
            );
            dispatch({ type: "SET_WISHLIST", payload: response.data.wishlist });
          }
        } catch (error) {
          setLoading(false);
          console.log(error);
        } finally {
          setLoading(false);
        }
      } else {
        try {
          setLoading(true);
          setError("");
          const response = await removeFromWishlistService(product._id, auth.token);
          if (response.status === 200) {
            setLoading(false);
            toast.success(
              `${product.name} removed from the wishlist successfully!`
            );
            dispatch({ type: "SET_WISHLIST", payload: response.data.wishlist });
          }
        } catch (error) {
          setLoading(false);
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
    } else {
      toast("Please login first!");
      navigate("/login", { state: { from: location } });
    }
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
              {!isProductInCart(selectedProduct) ? "Add to cart" : "Go to cart"}
            </button>
            <button
              onClick={() => wishlistHandler(selectedProduct)}
              className="add-to-wishlist-btn"
            >
              {!isProductInWishlist(selectedProduct)
                ? "Add to wishlist"
                : "Remove from wishlist"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
