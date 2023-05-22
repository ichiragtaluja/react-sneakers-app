import "./Header.css";
import { GrCart } from "react-icons/gr";
import { CgHeart } from "react-icons/cg";
import React from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
import { GrSearch } from "react-icons/gr";
import { useData } from "../../contexts/DataProvider";
import { useAuth } from "../../contexts/AuthContext";
import { CgShoppingCart } from "react-icons/cg";
import { useUserData } from "../../contexts/UserDataProvider";

export const Header = () => {
  const { auth } = useAuth();
  const { dispatch } = useData();
  const { userDataState } = useUserData();
  const [showHamburger, setShowHamburger] = useState(true);
  const getActiveStyle = ({ isActive }) => {
    return { border: isActive ? "" : "" };
  };

  const totalProductsInCart = userDataState.cartProducts?.reduce(
    (acc, curr) => {
      return acc + curr.qty;
    },
    0
  );

  const isProductInCart = () => (Number(totalProductsInCart) ? true : false);

  const totalProductsInWishlist = userDataState.wishlistProducts.length;

  const isProductInWishlist = () =>
    Number(totalProductsInWishlist) ? true : false;

  return (
    <nav>
      <div className="nav-logo-home-button">
        <NavLink style={getActiveStyle} to="/">
          Home
        </NavLink>
      </div>

      <div className="nav-input-search">
        <input
          onChange={(e) =>
            dispatch({ type: "SEARCH", payload: e.target.value })
          }
          placeholder="Search"
        />
        <button>
          <GrSearch />
        </button>
      </div>

      <div
        className={
          !showHamburger
            ? "nav-link-container-mobile nav-link-container"
            : "nav-link-container"
        }
      >
        <NavLink
          onClick={() => setShowHamburger(true)}
          style={getActiveStyle}
          to="/product-listing"
        >
          Explore
        </NavLink>
        <NavLink
          onClick={() => setShowHamburger(true)}
          style={getActiveStyle}
          to={auth.isAuth ? "/logout" : "/login"}
        >
          {!auth.isAuth ? "Login" : "Logout"}
        </NavLink>
        <NavLink
          onClick={() => setShowHamburger(true)}
          style={getActiveStyle}
          to="wishlist"
        >
          <span>{!showHamburger ? "Wishlist" : ""}</span>
          <CgHeart size={25} className="wishlist" />{" "}
          {isProductInWishlist() && (
            <span className="cart-count cart-count-mobile">
              {totalProductsInWishlist}
            </span>
          )}
        </NavLink>
        <NavLink
          onClick={() => setShowHamburger(true)}
          style={getActiveStyle}
          to="/cart"
        >
          <span>{!showHamburger ? "Cart" : ""}</span>
          <CgShoppingCart size={25} className="cart" />{" "}
          {isProductInCart() && (
            <span className="cart-count cart-count-mobile">
              {" "}
              {totalProductsInCart}{" "}
            </span>
          )}
        </NavLink>
      </div>
      {showHamburger && (
        <div className="hamburger-icon" onClick={() => setShowHamburger(false)}>
          <RxHamburgerMenu size={20} color={"white"} />
        </div>
      )}
      {!showHamburger && (
        <div
          className="cross-tab-icon cross-tab-icon-mobile"
          onClick={() => setShowHamburger(true)}
        >
          <RxCross2 color={"rgb(106, 106, 65)"} size={25} />
        </div>
      )}
    </nav>
  );
};
