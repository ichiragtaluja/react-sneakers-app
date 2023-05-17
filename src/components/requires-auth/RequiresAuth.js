import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export const RequiresAuth = ({ children }) => {
  const { auth } = useAuth();

  const location = useLocation();
  return auth.isAuth ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};
