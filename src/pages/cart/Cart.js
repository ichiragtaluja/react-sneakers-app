import "./Cart.css";
import { changeQuantityCartService } from "../../services/cart-services/changeQuantityCartService";
import { removeFromCartService } from "../../services/cart-services/removeFromCartService";
import { Link } from "react-router-dom";

import { useUserData } from "../../contexts/UserDataProvider";
import { useAuth } from "../../contexts/AuthContext";
import { getCartService } from "../../services/cart-services/getCartService";

export const Cart = () => {
  const { auth } = useAuth();
  const {
    userDataState,
    dispatch,
    removeFromCartHandler,
    addToWishlistHandler,
    isProductInWishlist,
    removeFromWishlistHandler,
    totalDiscountedPrice,
    totalOriginalPrice,
    discountPercent,
  } = useUserData();

  const cartCountHandler = async (product, type) => {
    if (type === "decrement" && product.qty === 1) {
      const response = await removeFromCartService(product._id, auth.token);

      dispatch({ type: "SET_CART", payload: response.data.cart });
    } else {
      const response = await changeQuantityCartService(
        product._id,
        auth.token,
        type
      );

      dispatch({ type: "SET_CART", payload: response.data.cart });
    }
  };

  return (
    <div>
      <h1>Cart</h1>
      <div className="cart-container">
        <div className="cart-products-container">
          {userDataState.cartProducts.map((product) => (
            <div className="cart-product-card" key={product.name}>
              <p>{product.name}</p>
              <div className="count-btn-container">
                <button onClick={() => cartCountHandler(product, "decrement")}>
                  -
                </button>
                {product.qty}
                <button onClick={() => cartCountHandler(product, "increment")}>
                  +
                </button>
              </div>
              <div>
                <button onClick={() => removeFromCartHandler(product)}>
                  Remove to Cart
                </button>
                <button
                  onClick={() =>
                    isProductInWishlist(product)
                      ? removeFromWishlistHandler(product)
                      : addToWishlistHandler(product)
                  }
                >
                  {!isProductInWishlist(product)
                    ? "Add To Wishlist"
                    : "Remove From Wishlist"}
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-price-container">
          <span>Subtotal: </span>
          <span>{totalOriginalPrice}</span>
          <span>Discount: </span>
          <span>{discountPercent()}%</span>

          <span>Estimated Delivery & Handling:</span>
          <span>"Free"</span>
          <span>Total: </span>
          <span>{totalDiscountedPrice}</span>
          <Link to="/checkout">Place Order</Link>
        </div>
      </div>
    </div>
  );
};
