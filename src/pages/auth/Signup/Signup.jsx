import "./Signup.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsEyeSlash } from "react-icons/bs";
import { BsEye } from "react-icons/bs";
import { useState } from "react";

import React from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { signupService } from "../../../services/auth-services/signupService";

export const Signup = () => {
  const [hidePassword, setHidePassword] = useState(true);

  const { setAuth } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  const [signupCredential, setSignupCredential] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const signupHandler = async () => {
    try {
      const response = await signupService(
        signupCredential.email,
        signupCredential.password,
        signupCredential.firstName,
        signupCredential.lastName
      );
      const encodedToken = response.data.encodedToken;

      setAuth({ token: encodedToken, isAuth: true });

      localStorage.setItem("token", encodedToken);
      localStorage.setItem("isAuth", true);
      navigate("/");
    } catch (error) {}
  };

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
            required
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
              required
              onChange={(e) =>
                setSignupCredential({
                  ...signupCredential,
                  password: e.target.value,
                })
              }
              id="password"
              minlength="8"
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

        <div className="first-name-container">
          <label htmlFor="first-name">First Name</label>
          <input
            onChange={(e) =>
              setSignupCredential({
                ...signupCredential,
                firstName: e.target.value,
              })
            }
            id="first-name"
            placeholder="Enter first Name"
            type="text"
          />
        </div>

        <div className="last-name-container">
          <label htmlFor="last-name">Last Name</label>
          <input
            onChange={(e) =>
              setSignupCredential({
                ...signupCredential,
                lastName: e.target.value,
              })
            }
            id="last-name"
            placeholder="Enter last Name"
            type="text"
          />
        </div>

        <div className="remember-me-container">
          <div>
            <input required name="remember-me" type="checkbox" />
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
