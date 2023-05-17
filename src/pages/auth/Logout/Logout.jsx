import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

export const Logout = () => {

  const navigate = useNavigate();
  const { setAuth } = useAuth();


  const logoutHandler = () => {
    localStorage.removeItem("isAuth");
    localStorage.removeItem("token");
    setAuth({ token: "", isAuth: false });
    navigate("/");
  };
  return (
    <div className="logout-container">
      <h2>User Profile</h2>
      <button onClick={logoutHandler}>Logout</button>
    </div>
  );
};
