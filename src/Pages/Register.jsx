import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest, saveSession } from "../api";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ // Store some values
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (event) => { // Function called when any of the input fields change.
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleRegister = async (event) => {
    event.preventDefault(); // prevent the page from refreshing 

    if (!form.fullName || !form.email || !form.password || !form.confirmPassword) {
      setError("Please fill in all fields."); // Return error if there is an empty field
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match."); // Match the password and confirm password fields
      return;
    }

    try {
      const data = await apiRequest("/auth/register", { // Send an API request to the backend to register the user
        method: "POST",
        body: JSON.stringify(form), // As Json data
      });

      saveSession(data); // save (token, user info) in local storage
      navigate("/dashboard", { replace: true }); // Hide the Login page from the browser history and navigate to the dashboard
    } catch (err) {
      setError(err.message);
    }
  };

  // The code in samilar to Login page same logic, only the input fields are different and the API endpoint is different as well.

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
