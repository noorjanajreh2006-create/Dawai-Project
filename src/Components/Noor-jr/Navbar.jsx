import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <>
      <style>
        {`
          .nav-hover {
            text-decoration: none;
            color: #4a5568;
            font-weight: 500;
            padding: 8px 14px;
            border-radius: 6px;
            transition: all 0.3s ease;
          }

          .nav-hover:hover {
            color: #2b6cb0;
            background: #edf2f7;
          }

          .active {
            color: #2b6cb0;
            font-weight: bold;
          }
        `}
      </style>

      <nav style={styles.nav}>
        <div style={styles.logoContainer}>
          <img src="/Dawailogo.png" alt="Dawai Logo" style={styles.logo} />
        </div>

        <ul style={styles.links}>
          <li>
            <NavLink to="/dashboard" className={({ isActive }) => isActive ? "nav-hover active" : "nav-hover"}>
              Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink to="/medications" className={({ isActive }) => isActive ? "nav-hover active" : "nav-hover"}>
              Medications
            </NavLink>
          </li>

          <li>
            <NavLink to="/chat" className={({ isActive }) => isActive ? "nav-hover active" : "nav-hover"}>
              Assistant
            </NavLink>
          </li>

          <li>
            <NavLink to="/stats" className={({ isActive }) => isActive ? "nav-hover active" : "nav-hover"}>
              Stats
            </NavLink>
          </li>

          <li>
            <NavLink to="/profile" className={({ isActive }) => isActive ? "nav-hover active" : "nav-hover"}>
              Profile
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}

const styles = {
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 30px",
    borderBottom: "1px solid #e5e5e5",
    background: "#ffffff",
  },

  logoContainer: {
    display: "flex",
    alignItems: "center",
  },

  logo: {
    width: "80px",
    height: "50px",
    objectFit: "contain",
  },

  links: {
    listStyle: "none",
    display: "flex",
    gap: "20px",
    margin: 0,
    padding: 0,
  },
};

export default Navbar;