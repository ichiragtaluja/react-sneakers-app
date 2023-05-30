import React from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthProvider";
import { useData } from "../../../contexts/DataProvider";
import "./Logout.css";

export const Logout = () => {
  const { dispatch } = useData();
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const logoutHandler = () => {
    localStorage.removeItem("isAuth");
    localStorage.removeItem("token");
    setAuth({ token: "", isAuth: false });
    toast.success("You're logged out successfully!");
    dispatch({ type: "SET_CART", payload: [] });
    dispatch({ type: "SET_WISHLIST", payload: [] });
    dispatch({ type: "SET_ORDERS", payload: [] });

    navigate("/");
  };
  return (
    <div className="logout-container">
      <button onClick={logoutHandler}>Logout</button>
    </div>
  );
};
