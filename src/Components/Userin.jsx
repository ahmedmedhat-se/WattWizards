import axios from 'axios';
import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
    const checkToken = async () => {
      try {
        let xhr = new XMLHttpRequest();
        xhr.onload = function() {
          console.log(xhr.responseText);
          
          if (xhr.status === 200) {
            navigate("/profile")
          }
        };
        
        xhr.onerror = function() {
        console.log("Error:", xhr.responseText);
        };
        
        xhr.open('GET', 'http://localhost:8086/check', true);
        xhr.withCredentials = true;
        
        xhr.send();
      } catch (error) {
        console.log('Authentication error:', error);
      }
    };
    if(document.cookie.indexOf('token=') !== -1){
      checkToken();
    }
  }, []);

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
    
    const endpoint = isLogin ? "http://localhost:8086/login" : "http://localhost:8086/signup";
    const formData = new FormData(document.forms[0]);
  
    const xhr = new XMLHttpRequest();
    xhr.open("POST", endpoint, true);
    xhr.withCredentials = true;
  
    // Set up a listener for when the request completes
    xhr.onload = function () {
      const response = JSON.parse(xhr.responseText);
      if (xhr.status === 200) {
        console.log(response.token);
  
        if (response.token) {
          document.cookie += `token=${response.token}; path=/; expires=${new Date(Date.now() + 60*60*24*1000).toUTCString()};`;
        }
        navigate("/profile");
      } else {
        console.log("Error:", xhr.responseText);
        setError((JSON.parse(xhr.response)).message)
      }
    };
  
    // Handle network errors
    xhr.onerror = function () {
      console.log("Request failed" , xhr.status);
      setError("An error occurred while processing your request.");
    };
  
    // Send the request
    xhr.send(formData);
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
          name="email"
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
            name="password"
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