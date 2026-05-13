import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleRegister = (event) => {
    event.preventDefault();

    if (!form.fullName || !form.email || !form.password || !form.confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const user = {
      fullName: form.fullName,
      email: form.email,
    };

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", "frontend-demo-token");
    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="auth-page">
      <img src="/Dawailogo.png" alt="Dawai Logo" className="auth-logo" />

      <div className="glass-card auth-card p-4">
        <h3 className="text-center mb-2 fw-bold">Create Account</h3>
        <p className="text-center text-muted mb-4 small">Set up a local frontend profile</p>

        {error && <div className="alert alert-danger py-2">{error}</div>}

        <form onSubmit={handleRegister}>
          <input name="fullName" className="form-control mb-3" placeholder="Full Name" value={form.fullName} onChange={handleChange} />
          <input name="email" type="email" className="form-control mb-3" placeholder="Email" value={form.email} onChange={handleChange} />
          <input name="password" type="password" className="form-control mb-3" placeholder="Password" value={form.password} onChange={handleChange} />
          <input name="confirmPassword" type="password" className="form-control mb-3" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} />

          <button type="submit" className="btn w-100 fw-bold py-2 app-primary-button">
            Sign Up
          </button>
        </form>

        <p className="text-center mt-4 small">
          Already have an account? <Link to="/" className="app-link">Sign In</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
