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

export const Header = () => {
  const { auth } = useAuth();
  const { dispatch } = useData();
  const [showHamburger, setShowHamburger] = useState(true);
  const getActiveStyle = ({ isActive }) => {
    return { border: isActive ? "" : "" };
  };

  const totalProductsInCart = 1;
  const totalProductsInWishlist = 1;

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
          <span className="cart-count">{totalProductsInCart}</span>
        </NavLink>
        <NavLink
          onClick={() => setShowHamburger(true)}
          style={getActiveStyle}
          to="/cart"
        >
          <span>{!showHamburger ? "Cart" : ""}</span>
          <CgShoppingCart size={25} className="cart" />{" "}
          <span className="cart-count">{totalProductsInWishlist}</span>
        </NavLink>
      </div>
      {showHamburger && (
        <div className="hamburger-icon" onClick={() => setShowHamburger(false)}>
          <RxHamburgerMenu />
        </div>
      )}
      {!showHamburger && (
        <div className="cross-tab-icon" onClick={() => setShowHamburger(true)}>
          <RxCross2 />
        </div>
      )}
    </nav>
  );
};
