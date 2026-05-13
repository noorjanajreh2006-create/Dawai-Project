import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../Components/Noor-jr/Footer";
import { apiRequest } from "../api";

const MISSED_GRACE_PERIOD_MS = 5 * 60 * 1000;

function getScheduledDate(dateKey, timeValue) {
  if (!timeValue || !/^\d{2}:\d{2}$/.test(timeValue)) {
    return null;
  }

  const [hours, minutes] = timeValue.split(":").map(Number);
  const scheduledDate = new Date(`${dateKey}T00:00:00`);
  scheduledDate.setHours(hours, minutes, 0, 0);
  return scheduledDate;
}

function playReminderTone() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    const audioContext = new AudioContext();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.type = "sine";
    oscillator.frequency.value = 880;
    gain.gain.value = 0.08;
    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.6);
  } catch {
    // Browser audio policies can block sound before user interaction.
  }
}

function Dashboard() {
  const [medications, setMedications] = useState([]);
  const [doseStatus, setDoseStatus] = useState({});
  const [stats, setStats] = useState([]);
  const [error, setError] = useState("");
  const [savingId, setSavingId] = useState(null);
  const notifiedRef = useRef(new Set());
  const autoMissedRef = useRef(new Set());
  const savedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const todayKey = new Date().toISOString().slice(0, 10);
  const todayStats = stats.find((item) => item.date === todayKey);
  const takenToday = todayStats?.adherence || 0;

  const refreshStats = useCallback(() => {
    return apiRequest("/stats").then(setStats);
  }, []);

  useEffect(() => {
    Promise.all([
      apiRequest("/medications"),
      apiRequest("/stats"),
      apiRequest(`/medications/dose-logs?date=${todayKey}`),
    ])
      .then(([medicationsData, statsData, logsData]) => {
        setMedications(medicationsData);
        setStats(statsData);
        setDoseStatus(logsData.reduce((acc, log) => {
          acc[log.medicationId] = log.status;
          return acc;
        }, {}));
      })
      .catch((err) => setError(err.message));
  }, [todayKey]);

  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission().catch(() => {});
    }
  }, []);

  const handleDoseStatus = useCallback(async (medicationId, status) => {
    setError("");
    setSavingId(medicationId);

    try {
      await apiRequest(`/medications/${medicationId}/log-dose`, {
        method: "POST",
        body: JSON.stringify({ status, date: todayKey }),
      });
      setDoseStatus((currentStatus) => ({ ...currentStatus, [medicationId]: status }));
      await refreshStats();
    } catch (err) {
      setError(err.message);
    } finally {
      setSavingId(null);
    }
  }, [refreshStats, todayKey]);

  useEffect(() => {
    const checkMedicationTimes = () => {
      const now = new Date();

      medications.forEach((medication) => {
        if (doseStatus[medication.id]) {
          return;
        }

        const scheduledDate = getScheduledDate(todayKey, medication.times);
        if (!scheduledDate) {
          return;
        }

        const notificationKey = `${todayKey}:${medication.id}:due`;
        const missedKey = `${todayKey}:${medication.id}:missed`;
        const missedAt = new Date(scheduledDate.getTime() + MISSED_GRACE_PERIOD_MS);

        if (now >= scheduledDate && now < missedAt && !notifiedRef.current.has(notificationKey)) {
          notifiedRef.current.add(notificationKey);
          playReminderTone();

          if ("Notification" in window && Notification.permission === "granted") {
            new Notification("Dawai reminder", {
              body: `Time to take ${medication.name}`,
            });
          } else {
            window.alert(`Time to take ${medication.name}`);
          }
        }

        if (now >= missedAt && !autoMissedRef.current.has(missedKey)) {
          autoMissedRef.current.add(missedKey);
          handleDoseStatus(medication.id, "missed");
        }
      });
    };

    checkMedicationTimes();
    const intervalId = window.setInterval(checkMedicationTimes, 30000);

    return () => window.clearInterval(intervalId);
  }, [handleDoseStatus, medications, doseStatus, todayKey]);

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

                <div className="mt-3">
                  {doseStatus[medication.id] === "taken" && <span className="badge bg-success">Taken today</span>}
                  {doseStatus[medication.id] === "missed" && <span className="badge bg-danger">Missed today</span>}
                  {!doseStatus[medication.id] && <span className="badge bg-secondary">Waiting for dose time</span>}
                </div>

                {medication.notes && <p className="text-muted small mt-3 mb-0">{medication.notes}</p>}

                <div className="d-flex gap-2 mt-4">
                  <button
                    className={`btn btn-sm flex-fill ${doseStatus[medication.id] === "taken" ? "btn-success" : "btn-outline-success"}`}
                    disabled={savingId === medication.id}
                    onClick={() => handleDoseStatus(medication.id, "taken")}
                  >
                    Taken
                  </button>
                  <button
                    className={`btn btn-sm flex-fill ${doseStatus[medication.id] === "missed" ? "btn-danger" : "btn-outline-danger"}`}
                    disabled={savingId === medication.id}
                    onClick={() => handleDoseStatus(medication.id, "missed")}
                  >
                    Missed
                  </button>
                </div>
              </div>
            </div>
            ))}
          </div>
        )}

        <Footer studentName="Abdallah Yaseen " studentId="12324262" githubUrl="https://github.com/abdalla-yaseen1" />
      </main>
    </div>
  );
}

export default Dashboard;
