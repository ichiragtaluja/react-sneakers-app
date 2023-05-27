import React from "react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

import "./UserProfile.css";

export const UserProfile = () => {
  return (
    <div>
      {/* <h1 className="user-profile-heading">My Profile</h1> */}
      <div className="user-profile-container">
        <div className="link-container">
          <Link to="/profile">Profile</Link>
          <Link to="/profile/orders">Orders</Link>
          <Link to="/profile/addresses">Addresses</Link>
        </div>
        <Outlet />
      </div>
    </div>
  );
};
