import React, { useState } from "react";
import "./signIn.css";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../service/auth-service";
import { useDispatch } from "react-redux";
import { setAccessToken, setUser } from "../../store/authSlice";
import { companyLogo } from "../../../config";
import log from "loglevel";

const SignIn = () => {
  const dispatch = useDispatch();
  const [signinForm, setSigninForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSigninForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      email: "",
      password: "",
    };

    if (!signinForm.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(signinForm.email)) {
      newErrors.email = "Please enter a valid email";
      isValid = false;
    }

    if (!signinForm.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (signinForm.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      setApiError("");
      try {
        const response = await loginUser(signinForm);

        // Store token in Redux and localStorage
        dispatch(setAccessToken(response.token));
        localStorage.setItem("accessToken", response.token);

        // Optionally set dummy user (until you fetch from BFF)
        const dummyUser = {
          userId: signinForm.email,
          cartId: null,
        };
        dispatch(setUser(dummyUser));
        localStorage.setItem("userId", dummyUser.userId);

        // ✅ Redirect to generic dashboard (or fetch user role later)
        navigate("/product");
      } catch (error) {
        log.error("Login error:", error);
        setApiError(error.message || "Failed to sign in. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div>
      <div className="signin-container">
        <div className="left-column"></div>
        <div className="right-column">
          <div className="signin-card">
            <div className="logo-container">
              <img src={companyLogo} alt="Company Logo" className="logo" />
            </div>
            <form onSubmit={onSubmit} className="signin-form">
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  value={signinForm.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="form-input"
                  aria-label="Email input"
                />
                {errors.email && (
                  <div className="error-message">{errors.email}</div>
                )}
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  value={signinForm.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="form-input"
                  aria-label="Password input"
                />
                {errors.password && (
                  <div className="error-message">{errors.password}</div>
                )}
              </div>
              {apiError && <div className="api-error-message">{apiError}</div>}
              <button
                type="submit"
                className="signin-button"
                disabled={
                  !signinForm.email ||
                  !signinForm.password ||
                  errors.email ||
                  errors.password ||
                  isLoading
                }
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </button>
              <div className="login-link">
                Create new account <Link to="/signup">Sign Up</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
