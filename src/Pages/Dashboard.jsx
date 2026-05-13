import React from "react";
import { Link } from "react-router-dom";
import { medicationData } from "../data/medData";
import Footer from "../Components/Noor-jr/Footer";

function Dashboard() {
  const medications = JSON.parse(localStorage.getItem("dawai-medications") || "[]");
  const logs = JSON.parse(localStorage.getItem("dawai-dose-logs") || "[]");
  const savedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const source = medications.length ? medications : medicationData;
  const takenToday = logs.filter((log) => log.status === "taken" && log.date === new Date().toISOString().slice(0, 10)).length;

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
            <strong>{source.length}</strong>
          </div>
        </div>
      </header>

      <main className="container pb-5">
        <div className="row g-4 mb-4">
          <div className="col-md-4">
            <div className="glass-card p-4 stat-card">
              <span>Tracked Today</span>
              <strong>{takenToday}</strong>
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

        <div className="row g-4">
          {source.map((medication) => (
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

        <Footer studentName="Abdallah Yaseen + Dawai Team" studentId="Frontend Merge" githubUrl="https://github.com/noorjanajreh2006-create/Dawai-Project" />
      </main>
    </div>
  );
}

export default Dashboard;
