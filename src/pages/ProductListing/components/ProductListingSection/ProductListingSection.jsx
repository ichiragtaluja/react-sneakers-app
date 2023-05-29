import "./ProductListingSection.css";
import Tilt from "react-parallax-tilt";
import React from "react";

import { useData } from "../../../../contexts/DataProvider";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { getCategoryWiseProducts } from "../../../../helpers/filter-functions/category";
import { getRatedProducts } from "../../../../helpers/filter-functions/ratings";
import { getPricedProducts } from "../../../../helpers/filter-functions/price";
import { getSortedProducts } from "../../../../helpers/filter-functions/sort";
import { getSearchedProducts } from "../../../../helpers/searchedProducts";
import { AiOutlineHeart } from "react-icons/ai";
import { AiTwotoneHeart } from "react-icons/ai";
import { useUserData } from "../../../../contexts/UserDataProvider";
import { useAuth } from "../../../../contexts/AuthProvider";
import { BsFillStarFill } from "react-icons/bs";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { addToCartService } from "../../../../services/cart-services/addToCartService";
import { addToWishlistService } from "../../../../services/wishlist-services/addToWishlistService";
import { removeFromWishlistService } from "../../../../services/wishlist-services/removeFromWishlist";

export const ProductListingSection = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { state } = useData();
  const { isProductInCart, dispatch, userDataState } = useUserData();

  const { auth } = useAuth();

  const isProductInWishlist = (product) => {
    const found = userDataState.wishlistProducts.find(
      (item) => item._id === product._id
    );
    return found ? true : false;
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
          const response = await removeFromWishlistService(
            product._id,
            auth.token
          );
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

  const {
    allProductsFromApi,
    allCategories,
    inputSearch,
    filters: { rating, categories, price, sort },
  } = state;

  const navigate = useNavigate();

  const searchedProducts = getSearchedProducts(allProductsFromApi, inputSearch);

  const ratedProducts = getRatedProducts(searchedProducts, rating);

  const categoryProducts = getCategoryWiseProducts(ratedProducts, categories);

  const pricedProducts = getPricedProducts(categoryProducts, price);

  const sortedProducts = getSortedProducts(pricedProducts, sort);

  return (
    <div className="product-card-container">
      {sortedProducts.map((product) => {
        const {
          _id,
          id,
          name,
          original_price,
          discounted_price,
          category_name,
          is_stock,
          rating,
          reviews,
          description,
          trending,
          size,
          img,
        } = product;

        return (
          <Tilt
            key={product._id}
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            glareEnable={false}
            transitionSpeed={2000}
            scale={1.02}
          >
            <div className="product-card" key={_id}>
              <Link to={`/product-details/${id}`}>
                <div className="product-card-image">
                  <Tilt
                    transitionSpeed={2000}
                    tiltMaxAngleX={15}
                    tiltMaxAngleY={15}
                    scale={1.18}
                  >
                    <img src={img} />
                  </Tilt>
                </div>
              </Link>

              <div className="product-card-details">
                <h3>{name}</h3>
                <p className="ratings">
                  {rating}
                  <BsFillStarFill color="orange" /> ({reviews} reviews){" "}
                </p>
                <div className="price-container">
                  <p className="original-price">${original_price}</p>
                  <p className="discount-price">${discounted_price}</p>
                </div>
                <p></p>

                <p>Gender: {category_name}</p>
                <div className="info">
                  {!is_stock && <p className="out-of-stock">Out of stock</p>}
                  {trending && <p className="trending">Trending</p>}
                </div>
              </div>

              <div className="product-card-buttons">
                <button
                  onClick={() => addToCartHandler(product)}
                  className="cart-btn"
                >
                  {!isProductInCart(product) ? "Add To Cart" : "Go to Cart"}
                </button>
                <button
                  onClick={() => wishlistHandler(product)}
                  className="wishlist-btn"
                >
                  {!isProductInWishlist(product) ? (
                    <AiOutlineHeart color={"black"} size={30} />
                  ) : (
                    <AiTwotoneHeart color={"black"} size={30} />
                  )}
                </button>
              </div>
            </div>
          </Tilt>
        );
      })}
    </div>
  );
};
