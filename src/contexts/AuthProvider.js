import React, { createContext, useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { loginService } from "../services/auth-services/loginService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loginCredential, setLoginCredential] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const encodedToken = localStorage.getItem("token");
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");
  const email = localStorage.getItem("email");
  const navigate = useNavigate();
  const location = useLocation();

  const [auth, setAuth] = useState(
    encodedToken
      ? { token: encodedToken, isAuth: true, firstName, lastName, email }
      : { token: "", isAuth: false }
  );

  const loginHandler = async (e, email, password) => {
    e.preventDefault();
    try {
      setLoginLoading(true);
      setError("");
      setLoginCredential({ email, password });
      const response = await loginService(email, password);

      if (response.status === 200) {
        setLoginLoading(false);
        toast.success(`Welcome back, ${response.data.foundUser.firstName}!`);
        const encodedToken = response.data.encodedToken;
        const firstName = response.data.foundUser.firstName;
        const lastName = response.data.foundUser.lastName;
        const email = response.data.foundUser.email;

        setAuth({
          token: encodedToken,
          isAuth: true,
          firstName,
          lastName,
          email,
        });

        localStorage.setItem("token", encodedToken);
        localStorage.setItem("isAuth", true);
        localStorage.setItem("firstName", firstName);
        localStorage.setItem("lastName", lastName);
        localStorage.setItem("email", email);
        setLoginCredential({ email: "", password: "" });

        navigate(location?.state?.from.pathname || "/");
      }
    } catch (error) {
      setLoginLoading(false);
      setError(error.response.data.errors[0]);
    } finally {
      setLoginLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        loginHandler,
        error,
        setError,
        loginLoading,
        setLoginLoading,
        loginCredential,
        setLoginCredential,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
