import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Noor-jr/Footer";
import Navbar from "../Components/Noor-jr/Navbar";

function ProfileSettings() {
  const navigate = useNavigate();
  const savedUser = JSON.parse(localStorage.getItem("user"));

  const [fullName, setFullName] = useState(savedUser?.fullName || "");
  const [email, setEmail] = useState(savedUser?.email || "");
  const [password, setPassword] = useState("");

  const handleSave = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:3000/api/auth/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Adds Bearer before the token because the stored token does not include it
      },
      body: JSON.stringify({
        fullName,
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message);
      return;
    }

    localStorage.setItem("user", JSON.stringify(data.user));
    alert("Profile updated successfully");
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };

  return (
    <div className="min-vh-100 d-flex flex-column bg-light">
      <Navbar />

      <main className="flex-grow-1 py-5">
        <div className="container">
          <div className="mb-4">
            <h3 style={{ color: "#2b6cb0", fontWeight: "600" }}>
              Profile Settings
            </h3>
            <p className="text-muted mb-0">Manage your account</p>
          </div>

          <div className="row g-4 align-items-stretch">

            <div className="col-md-4">
              <div className="card p-4 text-center h-100" style={{ borderRadius: "14px" }}>
                
                <img
                  src="/Dawailogo.png"
                  alt="logo"
                  style={{ width: "90px", opacity: 0.8 }}
                  className="mb-3 mx-auto"
                />

                <h5 className="mb-1">{fullName || "User Name"}</h5>
                <p className="text-muted mb-3" style={{ fontSize: "14px" }}>
                  {email}
                </p>

                <hr />

                <p className="text-muted mb-0" style={{ fontSize: "13px" }}>
                  Your current profile information
                </p>

              </div>
            </div>

            <div className="col-md-8">
              <div className="card shadow-sm p-4 h-100" style={{ borderRadius: "14px" }}>
                <h4 className="mb-4">Account Information</h4>

                <form onSubmit={handleSave}>
                  <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label">New Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Leave blank if no change"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="d-flex justify-content-between align-items-center">
                    <button
                      type="submit"
                      className="btn px-4"
                      style={{ background: "#2b6cb0", color: "#fff" }}
                    >
                      Save Changes
                    </button>

                    <button
                      type="button"
                      className="btn btn-outline-danger px-4"
                      onClick={handleLogout}
                    >
                      Sign Out
                    </button>
                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>
      </main>

      <div className="container pb-4">
        <Footer
          studentName="NOOR JANAJREH"
          studentId="12400696"
          githubUrl="https://github.com/noorjanajreh2006-create"
        />
      </div>
    </div>
  );
}

export default ProfileSettings;