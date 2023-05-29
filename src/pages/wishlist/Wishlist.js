import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider";
import { useUserData } from "../../contexts/UserDataProvider";
import { removeFromWishlistService } from "../../services/wishlist-services/removeFromWishlist";
import { BsFillStarFill } from "react-icons/bs";
import "./Wishlist.css";
import { useState } from "react";
import { addToCartService } from "../../services/cart-services/addToCartService";
import { toast } from "react-hot-toast";
import { useLocation } from "react-router-dom";

export const Wishlist = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { auth } = useAuth();
  const { userDataState, dispatch, isProductInCart } = useUserData();

  const removeFromWishlistHandler = async (product) => {
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
                onClick={() => addToCartHandler(product)}
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
