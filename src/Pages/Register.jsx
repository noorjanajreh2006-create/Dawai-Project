import React from "react";
import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 py-4" style={{ backgroundColor: 'var(--bg-color)' }}>

      <h1 className="fw-bold mb-4" style={{ color: 'var(--accent-color)' }}>💊 Dawai</h1>

      <div className="glass-card p-4 mx-3" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center mb-2 fw-bold">Create an Account</h3>
        <p className="text-center text-muted mb-4 small">
          Sign up to track your medication progress
        </p>


        <div className="d-flex align-items-center my-3">
          <hr className="flex-grow-1" style={{ borderColor: 'var(--text-secondary)' }} />
          <span className="px-3 small text-muted">OR EMAIL</span>
          <hr className="flex-grow-1" style={{ borderColor: 'var(--text-secondary)' }} />
        </div>

        <form>
          <div className="mb-3">
            <label className="small fw-bold opacity-75 mb-1">Full Name</label>
            <input
              type="text"
              className="form-control"
              style={{ backgroundColor: 'transparent', color: 'var(--text-primary)', borderColor: 'var(--text-secondary)' }}
              placeholder="John Doe"
            />
          </div>

          <div className="mb-3">
            <label className="small fw-bold opacity-75 mb-1">Email Address</label>
            <input
              type="email"
              className="form-control"
              style={{ backgroundColor: 'transparent', color: 'var(--text-primary)', borderColor: 'var(--text-secondary)' }}
              placeholder="name@example.com"
            />
          </div>

          <div className="mb-4">
            <label className="small fw-bold opacity-75 mb-1">Password</label>
            <input
              type="password"
              className="form-control"
              style={{ backgroundColor: 'transparent', color: 'var(--text-primary)', borderColor: 'var(--text-secondary)' }}
              placeholder="••••••••"
            />
          </div>

          <button className="btn w-100 fw-bold py-2 shadow-sm border-0" style={{ background: "var(--accent-color)", color: "#fff" }}>
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
