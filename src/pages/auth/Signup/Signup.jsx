import "./Signup.css";
import { Link } from "react-router-dom";
import { BsEyeSlash } from "react-icons/bs";
import { BsEye } from "react-icons/bs";
import { useState } from "react";

import React from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { signupService } from "../../../services/auth-services/signupService";

export const Signup = () => {
  const [hidePassword, setHidePassword] = useState(true);

  const [signupCredential, setSignupCredential] = useState({
    email: "",
    password: "",
  });

  const signupHandler = async () => {
    try {
      const response = await signupService(
        signupCredential.email,
        signupCredential.password
      );
      const token = response.data.encodedToken;
      localStorage.setItem("token", token);
    } catch (error) {}
  };

  const { setIsLoggedIn } = useAuth();

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          signupHandler();
        }}
        className="signup-body"
      >
        <div className="email-container">
          <label htmlFor="email">Email Address</label>
          <input
            onChange={(e) =>
              setSignupCredential({
                ...signupCredential,
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
                setSignupCredential({
                  ...signupCredential,
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
            <label htmlFor="remember-me">
              I accept all terms and conditions
            </label>
          </div>
        </div>

        <div className="login-btn-container">
          <input value="Sign up" type="submit" />
          <button>Login with test credentials</button>
        </div>
        <Link to="/login">Already have an account?</Link>
      </form>
    </div>
  );
};
