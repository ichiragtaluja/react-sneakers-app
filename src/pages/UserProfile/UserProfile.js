import React from "react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

export const UserProfile = () => {
  return (
    <div>
      <h1>My Profile</h1>
      <Link to="/profile">Profile</Link>
      <Link to="/profile/orders">Orders</Link>
      <Link to="/profile/addresses">Addresses</Link>
      <Outlet />
    </div>
  );
};
