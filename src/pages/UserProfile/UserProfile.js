import React from "react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { useData } from "../../contexts/DataProvider";

import "./UserProfile.css";

export const UserProfile = () => {
  const { loading } = useData();
  return (
    !loading && (
      <div>
        <div className="user-profile-container">
          <div className="link-container">
            <Link to="/profile">Profile</Link>
            <Link to="/profile/orders">Orders</Link>
            <Link to="/profile/addresses">Addresses</Link>
          </div>
          <Outlet />
        </div>
      </div>
    )
  );
};
