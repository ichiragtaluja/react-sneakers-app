import React from "react";
import "./Login.css";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { BsEyeSlash } from "react-icons/bs";
import { BsEye } from "react-icons/bs";
import { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { loginService } from "../../../services/auth-services/loginService";

export const Login = () => {
  const [hidePassword, setHidePassword] = useState(true);
  const { auth, setAuth } = useAuth();
  const [error, setError] = useState("");

  const [loginCredential, setLoginCredential] = useState({
    email: "",
    password: "",
  });
  const { email, password } = loginCredential;

  const location = useLocation();
  const navigate = useNavigate();

  const loginHandler = async (e, email, password) => {
    e.preventDefault();
    try {
      setLoginCredential({ email, password });
      const response = await loginService(email, password);

      console.log("res", response);
      if (response.status === 200) {
        const encodedToken = response.data.encodedToken;

        setAuth({ token: encodedToken, isAuth: true });

        localStorage.setItem("token", encodedToken);
        localStorage.setItem("isAuth", true);

        navigate(location?.state?.from.pathname || "/");
      }
    } catch (error) {
      setError(error.response.data.errors[0]);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form
        onSubmit={(e) => loginHandler(e, email, password)}
        className="login-body"
      >
        <div className="email-container">
          <label htmlFor="email">Email</label>
          <input
            value={loginCredential.email}
            // required
            onChange={(e) =>
              setLoginCredential({
                ...loginCredential,
                email: e.target.value,
              })
            }
            id="email"
            placeholder="Email Address"
            type="email"
          />
        </div>

        <div className="password-container">
          <label htmlFor="password">Password</label>
          <div className="input-container">
            <input
              value={loginCredential.password}
              required
              onChange={(e) =>
                setLoginCredential({
                  ...loginCredential,
                  password: e.target.value,
                })
              }
              id="password"
              placeholder="Password"
              type={hidePassword ? "password" : "text"}
            />{" "}
            {!hidePassword ? (
              <BsEye
                className="hide-show-password-eye"
                onClick={() => setHidePassword(!hidePassword)}
              />
            ) : (
              <BsEyeSlash
                className="hide-show-password-eye"
                onClick={() => setHidePassword(!hidePassword)}
              />
            )}
          </div>
        </div>

        <div className="remember-me-container">
          <div>
            <input name="remember-me" type="checkbox" />
            <label htmlFor="remember-me">Keep me signed in</label>
          </div>

          <p>Forgot your password?</p>
        </div>
        {error && <span className="error">{error}</span>}
        <div className="login-btn-container">
          <input value="Login" type="submit" />
          <button
            onClick={(e) => {
              loginHandler(e, "adarshbalika@gmail.com", "adarshbalika");
            }}
          >
            Login with Test Credentials
          </button>
        </div>
        <Link className="new-account" to="/signup">
          Create a new account?
        </Link>
      </form>
    </div>
  );
};
