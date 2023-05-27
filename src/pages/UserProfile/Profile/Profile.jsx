import React from "react";
import { useAuth } from "../../../contexts/AuthProvider";
import { Logout } from "../../auth/Logout/Logout";
import "./Profile.css";

export const Profile = () => {
  const { auth } = useAuth();

  return (
    <div className="profile-container">
      {/* <h3>Profile Details</h3> */}
      <div className="profile-details">
        <div className="name">
          <span>Full Name: </span>
          <span>
            {" "}
            {auth.firstName} {auth.lastName}{" "}
          </span>
        </div>

        <div className="email">
          <span>Email: {" "}</span>
          <span> {auth.email} </span>
        </div>
      </div>
      <Logout />
    </div>
  );
};
