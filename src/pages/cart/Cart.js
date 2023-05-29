import { useState } from "react";
import "./Cart.css";
import { changeQuantityCartService } from "../../services/cart-services/changeQuantityCartService";
import { removeFromCartService } from "../../services/cart-services/removeFromCartService";
import { Link } from "react-router-dom";
import { addToWishlistService } from "../../services/wishlist-services/addToWishlistService";
import { removeFromWishlistService } from "../../services/wishlist-services/removeFromWishlist";
import { useUserData } from "../../contexts/UserDataProvider";
import { useAuth } from "../../contexts/AuthProvider";

import { MdDiscount } from "react-icons/md";
import { toast } from "react-hot-toast";
import { CartListing } from "./components/CartListing/CartListing";

export const Cart = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isCouponClicked, setIsCouponClicked] = useState(false);

  const { auth } = useAuth();
  const { userDataState, dispatch, orderDetails, } =
    useUserData();

  const [couponSelected, setCouponSelected] = useState([]);

  const couponsData = [
    {
      id: 1,
      name: "BLACK FRIDAY OFFER",
      description: "Get $20 off on a purchase of $250",
      minimumPurchase: 250,
      amount: 20,
    },
    {
      id: 2,
      name: "NEW YEAR OFFER",
      description: "Get 20% off on a purchase of $500",
      minimumPurchase: 500,
      discount: 20,
    },
  ];

  const isCouponApplied = couponSelected.length ? true : false;

  

  const couponHandler = (e, coupon) => {
    if (e.target.checked) {
      toast.success(`Woohoo! ${coupon.name} applied successfully!`)
      setCouponSelected([...couponSelected, coupon]);
    } else {
      toast.success(`${coupon.name} removed!`)
      setCouponSelected(couponSelected.filter(({ id }) => id !== coupon.id));
    }
  };





 

  const totalOriginalPrice = userDataState.cartProducts?.reduce(
    (acc, curr) => acc + curr.original_price * curr.qty,
    0
  );

  const totalDiscountedPriceBeforeCoupon = userDataState.cartProducts?.reduce(
    (acc, curr) => acc + curr.discounted_price * curr.qty,
    0
  );

  const totalCouponDiscount = couponSelected?.reduce(
    (acc, curr) =>
      curr.amount
        ? acc + curr.amount
        : acc + (curr.discount * totalDiscountedPriceBeforeCoupon) / 100,
    0
  );

  const totalDiscountedPriceAfterCoupon = (
    totalDiscountedPriceBeforeCoupon.toFixed(2) -
    totalCouponDiscount?.toFixed(2)
  ).toFixed(2);

  const placeOrderHandler = () => {
    dispatch({
      type: "SET_ORDER",
      payload: {
        cartItemsTotal: totalOriginalPrice,
        cartItemsDiscountTotal: totalDiscountedPriceAfterCoupon,
        couponDiscountTotal: totalCouponDiscount,
        orderAddress: userDataState.addressList[0],
      },
    });
  };

  return (
    <div>
      <h1>Cart</h1>
      <div className="cart-container">
    <CartListing/>
        <div>
          <div className="coupons-section">
            <div className="coupon-header">
              <MdDiscount color={"black"} />
              <h3 onClick={() => setIsCouponClicked(!isCouponClicked)}>
                Apply Coupons ?
              </h3>
            </div>

            {isCouponClicked && (
              <div className="coupon-list-container">
                {couponsData.map((coupon) => {
                  const {
                    id,
                    name,
                    description,
                    minimumPurchase,
                    discount,
                    amount,
                  } = coupon;
                  return (
                    <div key={id} className="coupon-card">
                      <input
                        onChange={(e) => couponHandler(e, coupon)}
                        disabled={
                          totalDiscountedPriceBeforeCoupon <= minimumPurchase
                        }
                        id={name}
                        type="checkbox"
                      />
                      <label htmlFor={name}>
                        <p className="name">{name}</p>
                        <p className="description">{description}</p>
                      </label>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="cart-price-container">
            <h2>Summary</h2>
            <div className="subtotal-container">
              <span>Sub-total: </span>
              <span>${totalOriginalPrice}</span>
            </div>
            <div className="discount-container">
              <span>Discount: </span>
              <span>
                -${totalOriginalPrice - totalDiscountedPriceBeforeCoupon}
              </span>
            </div>
            {isCouponApplied && (
              <div className="discount-container">
                <span>Coupon Discount: </span>
                <span> -${totalCouponDiscount}</span>
              </div>
            )}
            <div className="shipping-container">
              <span>Estimated Delivery & Handling:</span>
              <span>Free</span>
            </div>
            <div className="total">
              <span className="total-container">Total: </span>
              <span>${totalDiscountedPriceAfterCoupon}</span>
            </div>

            <div className="total-discount-container">
              <span>
                You saved $
                {(totalOriginalPrice - totalDiscountedPriceAfterCoupon).toFixed(
                  2
                )}{" "}
              </span>
            </div>

            <Link onClick={placeOrderHandler} to="/checkout">
              Place Order
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
