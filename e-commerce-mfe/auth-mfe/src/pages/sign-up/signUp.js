import React, { useState } from "react";
import "./signUp.css";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../service/auth-service";
import { companyLogo } from "../../../config";
import log from "loglevel";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    role: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  const ROLES = {
    CUSTOMER: "CUSTOMER",
    VENDOR: "VENDOR",
    DATA_STEWARD: "ADMIN", 
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName) newErrors.fullName = "Full name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Please enter a valid email";

    if (!formData.role) newErrors.role = "Role is required";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Confirm password is required";
    else if (formData.confirmPassword !== formData.password)
      newErrors.confirmPassword = "Passwords do not match";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    setSuccessMessage("");

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
    await registerUser({
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
    });

      setSuccessMessage("Registration successful! Please sign in.");
      setTimeout(() => navigate("/"), 2000); 
    } catch (error) {
      log.error("Error during registration:", error);
      setApiError(error.message || "Registration failed.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="logo-container">
          <img src={companyLogo} alt="Company Logo" className="logo" />
        </div>
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Full Name"
              className="form-input"
            />
            {touched.fullName && errors.fullName && (
              <div className="error-message">{errors.fullName}</div>
            )}
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Email"
              className="form-input"
            />
            {touched.email && errors.email && (
              <div className="error-message">{errors.email}</div>
            )}
          </div>

          <div className="form-group">
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              onBlur={handleBlur}
              className="form-input"
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value={ROLES.CUSTOMER}>Customer</option>
              <option value={ROLES.VENDOR}>Vendor</option>
              <option value={ROLES.DATA_STEWARD}>Admin</option>
            </select>
            {touched.role && errors.role && (
              <div className="error-message">{errors.role}</div>
            )}
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Password"
              className="form-input"
            />
            {touched.password && errors.password && (
              <div className="error-message">{errors.password}</div>
            )}
          </div>

          <div className="form-group">
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Confirm Password"
              className="form-input"
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <div className="error-message">{errors.confirmPassword}</div>
            )}
          </div>

          {apiError && <div className="api-error-message">{apiError}</div>}
          {successMessage && (
            <div className="success-message">{successMessage}</div>
          )}

          <button type="submit" className="signup-button">
            Sign Up
          </button>

          <div className="login-link">
            Already have an account? <Link to="/">Sign In</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
