import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export const RequiresAuth = ({ children }) => {
  const { token } = useAuth();
  console.log(token)
  const location = useLocation();
  return token ? children : <Navigate to="/login" state={{ from: location }} />;
};
