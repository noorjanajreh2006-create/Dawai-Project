import React, { useState, useEffect } from "react";
import axios from 'axios';

const API = "http://localhost:5000/api";

function Medications() {
  const [medications, setMedications] = useState(() => {
    const saved = localStorage.getItem('medications');
    return saved ? JSON.parse(saved) : [];
  });
  const [form, setForm] = useState({ name: "", dose: "", times: "", notes: "" });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");
  const [doseLogs, setDoseLogs] = useState(() => {
    const saved = localStorage.getItem('doseLogs');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    fetch(`${API}/medications`)
      .then(res => res.json())
      .then(data => setMedications(data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    localStorage.setItem('medications', JSON.stringify(medications));
  }, [medications]);

  useEffect(() => {
    localStorage.setItem('doseLogs', JSON.stringify(doseLogs));
  }, [doseLogs]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.dose || !form.times) {
      setError("Please fill all required fields");
      return;
    }
    setError("");
    if (editId !== null) {
      await fetch(`${API}/medications/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setMedications(medications.map(m => m.id === editId ? { ...form, id: editId } : m));
      setEditId(null);
    } else {
      const res = await fetch(`${API}/medications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, userId: "1" }),
      });
      const newMed = await res.json();
      setMedications([...medications, newMed]);
    }
    setForm({ name: "", dose: "", times: "", notes: "" });
  };

  const handleEdit = (med) => {
    setForm({ name: med.name, dose: med.dose, times: med.times, notes: med.notes });
    setEditId(med.id);
  };

  const handleDelete = async (id) => {
    await fetch(`${API}/medications/${id}`, { method: "DELETE" });
    setMedications(medications.filter(m => m.id !== id));
  };

  const handleLogDose = async (medId) => {
    try {
      await axios.post("http://localhost:5000/api/log-dose", {
        medId,
        status: "taken",
      });
      // Update dose logs state to toggle taken status for today
      setDoseLogs((prev) => {
        const todayLogs = prev[todayStr] || {};
        return {
          ...prev,
          [todayStr]: {
            ...todayLogs,
            [medId]: !todayLogs[medId],
          },
        };
      });
    } catch (err) {
      console.error("Error logging dose:", err);
    }
  };

  const todayStr = new Date().toISOString().split('T')[0];
  const takenStatus = doseLogs[todayStr] || {};

  return (
    <div className="min-vh-100 py-5" style={{ backgroundColor: 'var(--bg-color)' }}>
      <div className="container">
        <div className="text-center mb-5">
          <h1 className="fw-bold mb-0" style={{ color: 'var(--accent-color)' }}>
            💊 Dawai | دَوَائي
          </h1>
          <p className="text-muted mt-2">Manage your health journey efficiently</p>
        </div>

        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="glass-card mb-5 p-4 border-0">
              <h5 className="fw-bold mb-4">{editId ? "✏️ Edit Medication" : "➕ Add Medication"}</h5>
              {error && <div className="alert alert-danger py-2">{error}</div>}
              <div className="d-flex flex-column gap-3">
                <input className="form-control" style={{ backgroundColor: 'transparent', color: 'var(--text-primary)', borderColor: 'var(--text-secondary)' }} name="name" placeholder="Drug Name *" value={form.name} onChange={handleChange} />
                <input className="form-control" style={{ backgroundColor: 'transparent', color: 'var(--text-primary)', borderColor: 'var(--text-secondary)' }} name="dose" placeholder="Dose *" value={form.dose} onChange={handleChange} />
                <input className="form-control" style={{ backgroundColor: 'transparent', color: 'var(--text-primary)', borderColor: 'var(--text-secondary)' }} name="times" placeholder="Times (e.g. 8am, 2pm) *" value={form.times} onChange={handleChange} />
                <textarea className="form-control" style={{ backgroundColor: 'transparent', color: 'var(--text-primary)', borderColor: 'var(--text-secondary)' }} name="notes" placeholder="Notes (optional)" rows="2" value={form.notes} onChange={handleChange} />
                <button className="btn btn-primary w-100 fw-bold py-2 rounded-3 shadow-sm border-0" style={{ backgroundColor: 'var(--accent-color)' }} onClick={handleSubmit}>
                  {editId ? "Update Medication" : "Add Medication"}
                </button>
              </div>
            </div>

            <div className="d-flex flex-column gap-3">
              <h5 className="fw-bold px-2">Today Checklist</h5>
              {medications.length === 0 && (
                <div className="text-center py-5 text-muted opacity-50">No medications added yet.</div>
              )}
              {medications.map((med) => (
                <div key={med.id} className="glass-card p-3 border-0">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <div className="d-flex align-items-center gap-2">
                        <button
                          className={`btn btn-sm rounded-circle p-0 d-flex align-items-center justify-content-center ${takenStatus[med.id] ? 'btn-success' : 'btn-outline-secondary'}`}
                          style={{ width: '24px', height: '24px' }}
                          onClick={() => handleLogDose(med.id)}
                        >
                          {takenStatus[med.id] ? '✓' : ''}
                        </button>
                        <h5 className="fw-bold mb-0" style={{ color: 'var(--accent-color)' }}>{med.name}</h5>
                      </div>
                      <div className="d-flex gap-3 text-muted small mt-1 ms-4">
                        <span>{med.dose}</span>
                        <span>{med.times}</span>
                      </div>
                    </div>
                    <div className="d-flex gap-1">
                      <button className="btn btn-link py-0 text-muted" onClick={() => handleEdit(med)}>Edit</button>
                      <button className="btn btn-link py-0 text-danger" onClick={() => handleDelete(med.id)}>Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Medications;
