import React from "react";
import { MdDiscount } from "react-icons/md";
import { toast } from "react-hot-toast";
import { useState } from "react";
import "./Coupons.css";

import { useUserData } from "../../../../contexts/UserDataProvider";

export const Coupons = ({ couponSelected, setCouponSelected }) => {
  const [isCouponClicked, setIsCouponClicked] = useState(false);
  const { userDataState } = useUserData();

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

  const couponHandler = (e, coupon) => {
    if (e.target.checked) {
      toast.success(`Woohoo! ${coupon.name} applied successfully!`);
      setCouponSelected([...couponSelected, coupon]);
    } else {
      toast.success(`${coupon.name} removed!`);
      setCouponSelected(couponSelected.filter(({ id }) => id !== coupon.id));
    }
  };

  const totalDiscountedPriceBeforeCoupon = userDataState.cartProducts?.reduce(
    (acc, curr) => acc + curr.discounted_price * curr.qty,
    0
  );

  return (
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
            const { id, name, description, minimumPurchase, discount, amount } =
              coupon;
            return (
              <div key={id} className="coupon-card">
                <input
                  checked={couponSelected?.find((coupon) => coupon.id === id)}
                  onChange={(e) => couponHandler(e, coupon)}
                  disabled={totalDiscountedPriceBeforeCoupon <= minimumPurchase}
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
  );
};
