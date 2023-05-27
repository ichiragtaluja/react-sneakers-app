import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthProvider";
import "./Logout.css"

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
      <button onClick={logoutHandler}>Logout</button>
    </div>
  );
};
