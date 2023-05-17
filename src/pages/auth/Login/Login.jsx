import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { BsEyeSlash } from "react-icons/bs";
import { BsEye } from "react-icons/bs";
import { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { loginService } from "../../../services/auth-services/loginService";

export const Login = () => {
  const [hidePassword, setHidePassword] = useState(true);
  const { setIsLoggedIn } = useAuth();

  const [loginCredential, setLoginCredential] = useState({
    email: "",
    password: "",
  });

  const loginHandler = async () => {
    const response = await loginService(
      loginCredential.email,
      loginCredential.password
    );
    console.log(response.data.encodedToken);
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          loginHandler();
        }}
        className="login-body"
      >
        <div className="email-container">
          <label htmlFor="email">Email Address</label>
          <input
            onChange={(e) =>
              setLoginCredential({
                ...loginCredential,
                email: e.target.value,
              })
            }
            id="email"
            placeholder="Enter Email"
            type="email"
          />
        </div>

        <div className="password-container">
          <label htmlFor="password">Password</label>
          <div className="input-container">
            <input
              onChange={(e) =>
                setLoginCredential({
                  ...loginCredential,
                  password: e.target.value,
                })
              }
              id="password"
              placeholder="Enter Password"
              type={hidePassword ? "password" : "text"}
            />{" "}
            {!hidePassword ? (
              <BsEye onClick={() => setHidePassword(!hidePassword)} />
            ) : (
              <BsEyeSlash onClick={() => setHidePassword(!hidePassword)} />
            )}
          </div>
        </div>

        <div className="remember-me-container">
          <div>
            <input name="remember-me" type="checkbox" />
            <label htmlFor="remember-me">Remember-me</label>
          </div>

          <p>forgot your password?</p>
        </div>

        <div className="login-btn-container">
          <button onClick={() => setIsLoggedIn(true)}>Login</button>
          <button>Login with test credentials</button>
        </div>
        <Link to="/signup">Create a new account?</Link>
      </form>
    </div>
  );
};
