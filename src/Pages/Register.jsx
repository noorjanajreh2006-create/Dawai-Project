import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest, saveSession } from "../api";

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

  const handleRegister = async (event) => {
    event.preventDefault();

    if (!form.fullName || !form.email || !form.password || !form.confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const data = await apiRequest("/auth/register", {
        method: "POST",
        body: JSON.stringify(form),
      });

      saveSession(data);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-page">
      <img src="/Dawailogo.png" alt="Dawai Logo" className="auth-logo" />

      <div className="glass-card auth-card p-4">
        <h3 className="text-center mb-2 fw-bold">Create Account</h3>
        <p className="text-center text-muted mb-4 small">Create your Dawai account</p>

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
