import React from "react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { useData } from "../../contexts/DataProvider";
import { useState } from "react";

import "./UserProfile.css";

export const UserProfile = () => {
  const [currentPage, setCurrentPage] = useState("profile");
  const { loading } = useData();

  return (
    !loading && (
      <div>
        <div className="user-profile-container">
          <div className="link-container">
            <Link
              style={{ color: currentPage === "profile" ? "black" : "grey" }}
              onClick={() => setCurrentPage("profile")}
              to="/profile"
            >
              Profile
            </Link>
            <Link
              style={{ color: currentPage === "orders" ? "black" : "grey" }}
              onClick={() => setCurrentPage("orders")}
              to="/profile/orders"
            >
              Orders
            </Link>
            <Link
              style={{ color: currentPage === "addresses" ? "black" : "grey" }}
              onClick={() => setCurrentPage("addresses")}
              to="/profile/addresses"
            >
              Addresses
            </Link>
          </div>
          <Outlet />
        </div>
      </div>
    )
  );
};
