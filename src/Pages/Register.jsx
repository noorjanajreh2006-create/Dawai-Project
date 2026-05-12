import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/api/auth/register", { // Same logic as the Login page, but sends additional user data to create a new account
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
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 py-4 bg-light">
      <img
        src="/Dawailogo.png"
        alt="Dawai Logo"
        style={{ width: "160px", marginBottom: "30px", objectFit: "contain" }}
      />

      <div className="card p-4 shadow" style={{ width: "350px", borderRadius: "15px" }}>
        <h3 className="text-center mb-2">Create Account</h3>
        <p className="text-center text-muted mb-3" style={{ fontSize: "14px" }}>
          Sign up to get started
        </p>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button type="submit" className="btn w-100" style={{ background: "#2b6cb0", color: "#fff" }}>
            Sign Up
          </button>
        </form>

        <p className="text-center mt-3" style={{ fontSize: "14px" }}>
          Already have an account?{" "}
          <Link to="/" style={{ color: "#2b6cb0", fontWeight: "bold" }}>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;