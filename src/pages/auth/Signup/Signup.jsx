import "./Signup.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsEyeSlash } from "react-icons/bs";
import { BsEye } from "react-icons/bs";
import { useState } from "react";

import React from "react";
import { useAuth } from "../../../contexts/AuthProvider";
import { signupService } from "../../../services/auth-services/signupService";
import { toast } from "react-hot-toast";
import { useData } from "../../../contexts/DataProvider";

export const Signup = () => {
  const { loading } = useData();
  const [signUpLoading, setSignUpLoading] = useState(false);
  const [error, setError] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);

  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const [signupCredential, setSignupCredential] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });

  const signupHandler = async () => {
    try {
      setSignUpLoading(true);
      setError("");
      if (signupCredential.password === signupCredential.confirmPassword) {
        const response = await signupService(
          signupCredential.email,
          signupCredential.password,
          signupCredential.firstName,
          signupCredential.lastName
        );
        if (response.status === 201) {
          setSignUpLoading(false);
          toast.success(
            `You've successfully signed up, ${response.data.createdUser.firstName}`
          );
          const encodedToken = response.data.encodedToken;
          const firstName = response.data.createdUser.firstName;
          const lastName = response.data.createdUser.lastName;
          const email = response.data.createdUser.email;

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

          navigate("/");
        }
      }
    } catch (error) {
      setSignUpLoading(false);
      setError(error.response.data.errors);
    } finally {
      setSignUpLoading(false);
    }
  };

  return (
    !loading && (
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
                minLength="8"
                placeholder="Enter Password"
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

          <div className="confirm-password-container">
            <label for="confirm-password">Confirm Password</label>
            <div className="input-container">
              <input
                required
                id="confirm-password"
                onChange={(e) =>
                  setSignupCredential({
                    ...signupCredential,
                    confirmPassword: e.target.value,
                  })
                }
                minLength="8"
                placeholder="Enter Password Again"
                type={hidePassword ? "password" : "text"}
              />{" "}
              {!hidePassword ? (
                <BsEye
                  className="hide-show-password-eye"
                  onClick={() => setHideConfirmPassword(!hideConfirmPassword)}
                />
              ) : (
                <BsEyeSlash
                  className="hide-show-password-eye"
                  onClick={() => setHidePassword(!hidePassword)}
                />
              )}
            </div>
          </div>

          <div className="name-container">
            <label htmlFor="first-name">First Name</label>
            <input
              onChange={(e) =>
                setSignupCredential({
                  ...signupCredential,
                  firstName: e.target.value,
                })
              }
              id="first-name"
              placeholder="Enter First Name"
              type="text"
            />
          </div>

          <div className="name-container">
            <label htmlFor="last-name">Last Name</label>
            <input
              onChange={(e) =>
                setSignupCredential({
                  ...signupCredential,
                  lastName: e.target.value,
                })
              }
              id="last-name"
              placeholder="Enter Last Name"
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
          {error && <p className="error">{error[0]}</p>}

          <div className="signup-btn-container">
            <input value="Sign Up" type="submit" />
            <button>Login with Test Credentials</button>
          </div>
          <Link to="/login">Already have an account?</Link>
        </form>
      </div>
    )
  );
};
