import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fullName,
        email,
        password,
        confirmPassword
      })
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message);
      return;
    }

    alert("Register successful");
    navigate("/");
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 py-4" style={{ backgroundColor: 'var(--bg-color)' }}>
      <h1 className="fw-bold mb-4" style={{ color: 'var(--accent-color)' }}>💊 Dawai</h1>

      <div className="glass-card p-4 mx-3" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center mb-2 fw-bold">Create an Account</h3>
        <p className="text-center text-muted mb-4 small">
          Sign up to track your medication progress
        </p>

        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="small fw-bold opacity-75 mb-1">Full Name</label>
            <input
              type="text"
              className="form-control"
              style={{ backgroundColor: 'transparent', color: 'var(--text-primary)', borderColor: 'var(--text-secondary)' }}
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="small fw-bold opacity-75 mb-1">Email Address</label>
            <input
              type="email"
              className="form-control"
              style={{ backgroundColor: 'transparent', color: 'var(--text-primary)', borderColor: 'var(--text-secondary)' }}
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="small fw-bold opacity-75 mb-1">Password</label>
            <input
              type="password"
              className="form-control"
              style={{ backgroundColor: 'transparent', color: 'var(--text-primary)', borderColor: 'var(--text-secondary)' }}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="small fw-bold opacity-75 mb-1">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              style={{ backgroundColor: 'transparent', color: 'var(--text-primary)', borderColor: 'var(--text-secondary)' }}
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn w-100 fw-bold py-2 shadow-sm border-0" style={{ background: "var(--accent-color)", color: "#fff" }}>
            Sign Up
          </button>
        </form>

        <p className="text-center mt-4 small">
          Already have an account?{" "}
          <Link to="/" style={{ color: "var(--accent-color)", fontWeight: "bold", textDecoration: 'none' }}>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
