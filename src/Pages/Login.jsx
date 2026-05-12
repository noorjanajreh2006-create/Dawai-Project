import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevents the page from refreshing when the form is submitted

    const response = await fetch("http://localhost:3000/api/auth/login", { // Sends the login request to the backend and waits for the response
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ // change the data into JSON
        email,
        password
      })
    });

    const data = await response.json(); // Stores the response data from the backend

    if (!response.ok) {
      alert(data.message);
      return;
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    alert("Login successful");
    navigate("/dashboard");
  };

  return ( // Most of the frontend design is built using Bootstrap
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

        <form onSubmit={handleLogin}>
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

          <button
            type="submit"
            className="btn w-100"
            style={{ background: "#2b6cb0", color: "#fff" }}
          >
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