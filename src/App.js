import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ProfileSettings from "./Pages/ProfileSettings";
import Dashboard from "./Pages/Dashboard";
import Medications from "./Pages/medications";
import Statistics from "./Pages/Statistics";

function AppShell({ theme, toggleTheme }) {
  const location = useLocation();
  const hideNav = location.pathname === "/" || location.pathname === "/register";

  return (
    <>
      {!hideNav && (
        <nav className="navbar navbar-expand-lg border-bottom px-4 app-navbar">
          <div className="container-fluid">
            <Link className="navbar-brand fw-bold d-flex align-items-center gap-2" to="/dashboard">
              <img src="/Dawailogo.png" alt="Dawai" className="brand-logo" />
              <span>Dawai</span>
            </Link>
            <div className="d-flex align-items-center gap-3 flex-wrap justify-content-end">
              <Link className="nav-link fw-semibold" to="/dashboard">Dashboard</Link>
              <Link className="nav-link fw-semibold" to="/medications">Medications</Link>
              <Link className="nav-link fw-semibold" to="/statistics">Stats</Link>
              <Link className="nav-link fw-semibold" to="/profile">Profile</Link>
              <button onClick={toggleTheme} className="btn btn-sm rounded-pill px-3 theme-toggle">
                {theme === "light" ? "Dark" : "Light"}
              </button>
            </div>
          </div>
        </nav>
      )}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/medications" element={<Medications />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/stats" element={<Navigate to="/statistics" replace />} />
        <Route path="/profile" element={<ProfileSettings />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </>
  );
}

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <BrowserRouter>
      <AppShell theme={theme} toggleTheme={toggleTheme} />
    </BrowserRouter>
  );
}

export default App;
