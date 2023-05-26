import "./Cart.css";
import { changeQuantityCartService } from "../../services/cart-services/changeQuantityCartService";
import { removeFromCartService } from "../../services/cart-services/removeFromCartService";
import { Link } from "react-router-dom";
import { addToWishlistService } from "../../services/wishlist-services/addToWishlistService";
import { removeFromWishlistService } from "../../services/wishlist-services/removeFromWishlist";
import { useUserData } from "../../contexts/UserDataProvider";
import { useAuth } from "../../contexts/AuthProvider";
import { getCartService } from "../../services/cart-services/getCartService";
import { MdDelete } from "react-icons/md";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";

export const Cart = () => {
  const { auth } = useAuth();
  const { userDataState, dispatch, isProductInWishlist } = useUserData();

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

  const removeFromCartHandler = async (product) => {
    const response = removeFromCartService(product._id, auth.token);
    dispatch({ type: "SET_CART", payload: (await response).data.cart });
  };

  const addToWishlistHandler = async (product) => {
    const response = await addToWishlistService(product, auth.token);
    dispatch({ type: "SET_WISHLIST", payload: response.data.wishlist });
  };

  const removeFromWishlistHandler = async (product) => {
    const response = await removeFromWishlistService(product._id, auth.token);
    dispatch({ type: "SET_WISHLIST", payload: response.data.wishlist });
  };

  const totalDiscountedPrice = userDataState.cartProducts?.reduce(
    (acc, curr) => acc + curr.discounted_price * curr.qty,
    0
  );

  const totalOriginalPrice = userDataState.cartProducts?.reduce(
    (acc, curr) => acc + curr.original_price * curr.qty,
    0
  );

  const discountPercent = () => {
    const totalPrice = userDataState?.cartProducts?.reduce(
      (acc, curr) => ({
        ...acc,
        original: acc.original + curr.original_price,
        discount: acc.discount + curr.discounted_price,
      }),
      { original: 0, discount: 0 }
    );

    const totalDiscount =
      (totalPrice.original - totalPrice.discount) / totalPrice.original;

    return totalDiscount?.toFixed(2) * 100;
  };

  return (
    <div>
      <h1>Cart</h1>
      <div className="cart-container">
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
                    className="counter-btn"
                    onClick={() => cartCountHandler(product, "decrement")}
                  >
                    -
                  </button>
                  <span>{product.qty}</span>
                  <button
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
                      onClick={() => addToWishlistHandler(product)}
                    />
                  ) : (
                    <AiFillHeart
                      size={25}
                      onClick={() => removeFromWishlistHandler(product)}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-price-container">
          <h2>Summary</h2>
          <div className="subtotal-container">
            <span>Sub-total: </span>
            <span>${totalOriginalPrice}</span>
          </div>
          <div className="discount-container">
            <span>Discount: </span>
            <span>{discountPercent().toFixed(1)}%</span>
          </div>
          <div className="shipping-container">
            <span>Estimated Delivery & Handling:</span>
            <span>Free</span>
          </div>
          <div className="total">
            <span className="total-container">Total: </span>
            <span>{totalDiscountedPrice}</span>
          </div>

          <Link to="/checkout">Place Order</Link>
        </div>
      </div>
    </div>
  );
};
