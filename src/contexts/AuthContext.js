import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const encodedToken = localStorage.getItem("token");
  const [token, setToken] = useState(encodedToken);

  return (
    <AuthContext.Provider
      value={{ token, setToken, isLoggedIn, setIsLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
