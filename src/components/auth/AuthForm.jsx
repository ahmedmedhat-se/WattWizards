import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import "../styles/auth-form.css";

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/wattwizards/profile";

  // Auto check token on mount
  useEffect(() => {
    const checkToken = () => {
      const token = getCookie("token");
      if (token) {
        fetch("http://localhost:8086/check", {
          method: "GET",
          credentials: "include"
        })
        .then(res => {
          if (res.status === 200) navigate("/wattwizards/profile");
        })
        .catch(err => console.log("Token check failed:", err));
      }
    };
    checkToken();
  }, []);

  // Helper to get cookie value
  const getCookie = (name) => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(email)) {
      setError("Invalid email format.");
      return;
    }

    if (!validatePasswordStrength(password)) {
      setError("Password must be at least 8 characters and include letters and numbers.");
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const endpoint = isLogin ? "http://localhost:8086/login" : "http://localhost:8086/signup";
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    if (!isLogin) formData.append("confirmPassword", confirmPassword);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", endpoint, true);
    xhr.withCredentials = true;

    xhr.onload = function () {
      const res = JSON.parse(xhr.responseText);
      if (xhr.status === 200 && res.token) {
        document.cookie = `token=${res.token}; path=/; expires=${new Date(Date.now() + 86400000).toUTCString()}`;
        navigate(from, { replace: true });
      } else {
        setError(res.message || "Login failed.");
      }
    };

    xhr.onerror = () => setError("An error occurred while processing your request.");
    xhr.send(formData);
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePasswordStrength = (password) => /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(password);

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError("");
  };

  return (
    <div className="auth-container">
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>

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
            type={passwordVisible ? "text" : "password"}
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required />
          <button
            type="button"
            onClick={() => setPasswordVisible(!passwordVisible)}
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
                type={confirmPasswordVisible ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required />
              <button
                type="button"
                onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                className="password-toggle-btn bg-light"
              >
                <i className={confirmPasswordVisible ? "fas fa-eye" : "fas fa-eye-slash"}></i>
              </button>
            </div>
          </>
        )}

        <button type="submit" className="btn btn-primary w-100 d-block mt-3">
          {isLogin ? "Login" : "Sign Up"}
        </button>
      </form>

      <p className="mt-3 text-center">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <span onClick={toggleForm} style={{ cursor: "pointer", color: "blue" }}>
          {isLogin ? "Sign Up" : "Login"}
        </span>
      </p>
    </div>
  );
}

export default AuthForm;