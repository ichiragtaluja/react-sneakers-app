import React from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { Logout } from "../../auth/Logout/Logout";

export const Profile = () => {
  const { auth } = useAuth();
  console.log("auth", auth);
  return (
    <div className="profile-container">
      <h1>Profile Details</h1>
      <div className="profile-details">
        <div>
          <span>Full Name</span>
          <span>
            {" "}
            {auth.firstName} {auth.lastName}{" "}
          </span>
        </div>

        <div>
          <span>Email</span>
          <span> {auth.email} </span>
        </div>
      </div>
      <Logout/>
    </div>
  );
};
