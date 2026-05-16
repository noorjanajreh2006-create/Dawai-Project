import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Noor-jr/Footer";
import { apiRequest, clearSession, saveSession } from "../api";

function ProfileSettings() {
  const navigate = useNavigate();
  const savedUser = JSON.parse(localStorage.getItem("user") || "{}");

  const [fullName, setFullName] = useState(savedUser.fullName || "");
  const [email, setEmail] = useState(savedUser.email || "");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSave = async (event) => {
    event.preventDefault();

    try {
      const data = await apiRequest("/auth/profile", {
        method: "PUT",
        body: JSON.stringify({ fullName, email, password }),
      });

      saveSession({ user: data.user });
      setPassword("");
      setMessage("Profile updated successfully.");
    } catch (err) {
      setMessage(err.message);
    }
  };

  const handleLogout = () => {
    clearSession();
    navigate("/", { replace: true });
  };

  return (
    <div className="min-vh-100 page-bg">
      <main className="container py-5">
        <div className="mb-4">
          <h3 className="section-title">Profile Settings</h3>
          <p className="text-muted mb-0">Manage your account profile.</p>
        </div>

        <div className="row g-4 align-items-stretch">
          <div className="col-md-4">
            <div className="glass-card p-4 text-center h-100">
              <img src="/Dawailogo.png" alt="Dawai logo" className="profile-logo mb-3" />
              <h5 className="mb-1">{fullName || "User Name"}</h5>
              <p className="text-muted mb-3 small">{email || "No email saved"}</p>
              <hr />
              <p className="text-muted mb-0 small">Manage your Dawai profile information and Stay secure 🔐</p>
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
                <input type="password" className="form-control mb-4" placeholder="Leave blank if no change" value={password} onChange={(event) => setPassword(event.target.value)} />

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
        <Footer studentName="Noor janajreh" studentId="12400696" githubUrl="https://github.com/noorjanajreh2006-create" />
      </div>
    </div>
  );
}

export default ProfileSettings;
