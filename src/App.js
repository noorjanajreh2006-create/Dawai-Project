import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./Pages/Login";
import Medications from "./Pages/medications";
import Statistics from "./Pages/Statistics";

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
      <nav className="navbar navbar-expand-lg border-bottom px-4" style={{ backgroundColor: 'var(--card-bg)', transition: 'background-color 0.3s' }}>
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold" style={{ color: 'var(--accent-color)' }} to="/">💊 Dawai</Link>
          <div className="d-flex align-items-center gap-3">
            <Link className="nav-link fw-semibold" style={{ color: 'var(--text-primary)' }} to="/medications">Medications</Link>
            <Link className="nav-link fw-semibold" style={{ color: 'var(--text-primary)' }} to="/statistics">Stats</Link>
            <button onClick={toggleTheme} className="btn btn-sm rounded-pill px-3 ms-2" style={{ border: '1px solid var(--text-secondary)', color: 'var(--text-primary)' }}>
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/medications" element={<Medications />} />
        <Route path="/statistics" element={<Statistics />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;