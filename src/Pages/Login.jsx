import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    const savedUser = JSON.parse(localStorage.getItem("user") || "{}");
    const user = {
      fullName: savedUser.fullName || "Dawai User",
      email,
    };

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", "frontend-demo-token");
    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="auth-page">
      <img src="/Dawailogo.png" alt="Dawai Logo" className="auth-logo" />

      <div className="glass-card auth-card p-4">
        <h3 className="text-center mb-2 fw-bold">Welcome Back</h3>
        <p className="text-center text-muted mb-4 small">Sign in to track your medication progress</p>

        {error && <div className="alert alert-danger py-2">{error}</div>}

        <form onSubmit={handleLogin}>
          <label className="small fw-bold opacity-75 mb-1">Email Address</label>
          <input type="email" className="form-control mb-3" placeholder="name@example.com" value={email} onChange={(event) => setEmail(event.target.value)} />

          <label className="small fw-bold opacity-75 mb-1">Password</label>
          <input type="password" className="form-control mb-4" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />

          <button type="submit" className="btn w-100 fw-bold py-2 app-primary-button">
            Sign In
          </button>
        </form>

        <p className="text-center mt-4 small">
          Do not have an account? <Link to="/register" className="app-link">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
