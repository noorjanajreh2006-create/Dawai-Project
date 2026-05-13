import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Noor-jr/Footer";

function ProfileSettings() {
  const navigate = useNavigate();
  const savedUser = JSON.parse(localStorage.getItem("user") || "{}");

  const [fullName, setFullName] = useState(savedUser.fullName || "");
  const [email, setEmail] = useState(savedUser.email || "");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSave = (event) => {
    event.preventDefault();
    const user = { fullName, email };
    localStorage.setItem("user", JSON.stringify(user));
    setPassword("");
    setMessage(password ? "Profile and password note saved locally." : "Profile saved locally.");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  return (
    <div className="min-vh-100 page-bg">
      <main className="container py-5">
        <div className="mb-4">
          <h3 className="section-title">Profile Settings</h3>
          <p className="text-muted mb-0">Manage the local frontend profile.</p>
        </div>

        <div className="row g-4 align-items-stretch">
          <div className="col-md-4">
            <div className="glass-card p-4 text-center h-100">
              <img src="/Dawailogo.png" alt="Dawai logo" className="profile-logo mb-3" />
              <h5 className="mb-1">{fullName || "User Name"}</h5>
              <p className="text-muted mb-3 small">{email || "No email saved"}</p>
              <hr />
              <p className="text-muted mb-0 small">This page is frontend-only and stores data in the browser.</p>
            </div>
          </div>

          <div className="col-md-8">
            <div className="glass-card p-4 h-100">
              <h4 className="mb-4">Account Information</h4>
              {message && <div className="alert alert-success py-2">{message}</div>}

              <form onSubmit={handleSave}>
                <label className="form-label">Full Name</label>
                <input className="form-control mb-3" value={fullName} onChange={(event) => setFullName(event.target.value)} />

                <label className="form-label">Email Address</label>
                <input type="email" className="form-control mb-3" value={email} onChange={(event) => setEmail(event.target.value)} />

                <label className="form-label">New Password</label>
                <input type="password" className="form-control mb-4" placeholder="Stored as a local demo note only" value={password} onChange={(event) => setPassword(event.target.value)} />

                <div className="d-flex justify-content-between align-items-center gap-3 flex-wrap">
                  <button type="submit" className="btn px-4 app-primary-button">Save Changes</button>
                  <button type="button" className="btn btn-outline-danger px-4" onClick={handleLogout}>Sign Out</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      <div className="container pb-4">
        <Footer studentName="Team Dawai" studentId="Frontend Merge" githubUrl="https://github.com/noorjanajreh2006-create/Dawai-Project" />
      </div>
    </div>
  );
}

export default ProfileSettings;
