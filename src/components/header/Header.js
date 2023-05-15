import "./Header.css";
import { GrCart } from "react-icons/gr";
import { CgHeart } from "react-icons/cg";
import React from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
import { GrSearch } from "react-icons/gr";

export const Header = () => {
  const [showHamburger, setShowHamburger] = useState(true);
  const getActiveStyle = ({ isActive }) => {
    return { border: isActive ? "1px solid black" : "" };
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
        <input placeholder="Search" />
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
          to="/login"
        >
          Login
        </NavLink>
        <NavLink
          onClick={() => setShowHamburger(true)}
          style={getActiveStyle}
          to="wishlist"
        >
          <span>{!showHamburger ? "Wishlist" : ""}</span>
          <CgHeart /> <span className="cart-count">{totalProductsInCart}</span>
        </NavLink>
        <NavLink
          onClick={() => setShowHamburger(true)}
          style={getActiveStyle}
          to="/cart"
        >
          <span>{!showHamburger ? "Cart" : ""}</span>
          <GrCart />{" "}
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
