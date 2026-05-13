import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../Components/Noor-jr/Footer";
import { apiRequest } from "../api";

function Dashboard() {
  const [medications, setMedications] = useState([]);
  const [stats, setStats] = useState([]);
  const [error, setError] = useState("");
  const savedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const todayKey = new Date().toISOString().slice(0, 10);
  const todayStats = stats.find((item) => item.date === todayKey);
  const takenToday = todayStats?.adherence || 0;

  useEffect(() => {
    Promise.all([apiRequest("/medications"), apiRequest("/stats")])
      .then(([medicationsData, statsData]) => {
        setMedications(medicationsData);
        setStats(statsData);
      })
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="min-vh-100 page-bg">
      <header className="dashboard-header py-5 mb-4">
        <div className="container d-flex justify-content-between align-items-center gap-4 flex-wrap">
          <div>
            <p className="text-muted mb-2">Welcome{savedUser.fullName ? `, ${savedUser.fullName}` : ""}</p>
            <h1 className="fw-bold mb-2">Today Medication Dashboard</h1>
            <p className="text-muted mb-0">{new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
          </div>

          <div className="dashboard-summary">
            <span>Total Medications</span>
            <strong>{medications.length}</strong>
          </div>
        </div>
      </header>

      <main className="container pb-5">
        {error && <div className="alert alert-danger py-2">{error}</div>}

        <div className="row g-4 mb-4">
          <div className="col-md-4">
            <div className="glass-card p-4 stat-card">
              <span>Tracked Today</span>
              <strong>{takenToday}%</strong>
            </div>
          </div>
          <div className="col-md-4">
            <div className="glass-card p-4 stat-card">
              <span>Saved Items</span>
              <strong>{medications.length}</strong>
            </div>
          </div>
          <div className="col-md-4">
            <div className="glass-card p-4 stat-card">
              <span>Quick Action</span>
              <Link to="/medications" className="btn btn-sm app-primary-button mt-2">Manage List</Link>
            </div>
          </div>
        </div>

        {medications.length === 0 ? (
          <div className="glass-card p-5 text-center">
            <h5 className="fw-bold mb-2">No medications yet</h5>
            <p className="text-muted mb-4">Add your first medication to start tracking your schedule.</p>
            <Link to="/medications" className="btn app-primary-button">Add Medication</Link>
          </div>
        ) : (
          <div className="row g-4">
            {medications.map((medication) => (
            <div className="col-12 col-md-6 col-lg-4" key={medication.id}>
              <div className="glass-card p-4 h-100">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <h5 className="fw-bold mb-1">{medication.name}</h5>
                    <small className="text-muted">{medication.dose || medication.dosage}</small>
                  </div>
                  <span className="badge app-badge">{medication.status || "Scheduled"}</span>
                </div>

                <div className="schedule-box">
                  <span>Time</span>
                  <strong>{medication.times || medication.time}</strong>
                </div>

                {medication.notes && <p className="text-muted small mt-3 mb-0">{medication.notes}</p>}
              </div>
            </div>
            ))}
          </div>
        )}

        <Footer studentName="Abdallah Yaseen + Dawai Team" studentId="Frontend + Backend Merge" githubUrl="https://github.com/noorjanajreh2006-create/Dawai-Project" />
      </main>
    </div>
  );
}

export default Dashboard;
