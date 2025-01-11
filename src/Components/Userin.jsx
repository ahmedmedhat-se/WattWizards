import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Userin() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false); 
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false); 
  const navigate = useNavigate();

  // Function to validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Function to validate password strength
  const validatePasswordStrength = (password) => {
    const minLength = 8;
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    return password.length >= minLength && regex.test(password);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email.");
      return;
    }

    if (!validatePasswordStrength(password)) {
      setError("Password must be at least 8 characters long and contain both letters and numbers.");
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Clear error and proceed
    setError("");
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError(""); // Clear any previous errors
  };

  return (
    <div className="userInfo-container">
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>

      {/* Show error message if any */}
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <label htmlFor="email" className="form-label">Email</label>
        <input className="form-control"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required />

        <label htmlFor="password" className="form-label">Password</label>
        <div className="password-container">
          <input className="form-control"
            type={passwordVisible ? "text" : "password"}  // Toggle password visibility
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required />
          <button
            type="button"
            onClick={() => setPasswordVisible(!passwordVisible)}  // Toggle visibility
            className="password-toggle-btn"
          >
            <i className={passwordVisible ? "fas fa-eye" : "fas fa-eye-slash"}></i>
          </button>
        </div>

        {!isLogin && (
          <>
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <div className="password-container">
              <input className="form-control"
                type={confirmPasswordVisible ? "text" : "password"}  // Toggle confirm password visibility
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required />
              <button
                type="button"
                onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}  // Toggle visibility
                className="password-toggle-btn"
              >
                <i className={confirmPasswordVisible ? "fas fa-eye-slash" : "fas fa-eye"}></i>
              </button>
            </div>
          </>
        )}

        <button type="submit" className="btn btn-success w-100 d-block">{isLogin ? "Login" : "Sign Up"}</button>
      </form>

      <p>
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <span onClick={toggleForm} style={{ cursor: "pointer", color: "blue" }}>
          {isLogin ? "Sign Up" : "Login"}
        </span>
      </p>
    </div>
  );
}

export default Userin;