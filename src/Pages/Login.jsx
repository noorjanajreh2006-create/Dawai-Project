import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 py-4 bg-light">

      <img
        src="/Dawailogo.png"
        alt="Dawai Logo"
        style={{ width: "160px", marginBottom: "30px", objectFit: "contain" }}
      />

      <div className="card p-4 shadow" style={{ width: "350px", borderRadius: "15px" }}>
        <h3 className="text-center mb-2">Welcome Back</h3>
        <p className="text-center text-muted mb-3" style={{ fontSize: "14px" }}>
          Sign in to continue
        </p>

        <form>
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
          />

          <button className="btn w-100" style={{ background: "#2b6cb0", color: "#fff" }}>
            Sign In
          </button>
        </form>

        <p className="text-center mt-3" style={{ fontSize: "14px" }}>
          Don’t have an account?{" "}
          <Link to="/register" style={{ color: "#2b6cb0", fontWeight: "bold" }}>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;