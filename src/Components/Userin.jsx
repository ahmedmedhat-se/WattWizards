import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Userin() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="userInfo-container">
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>

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
        <input className="form-control"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required />

        {!isLogin && (
          <>
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input className="form-control"
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required />
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