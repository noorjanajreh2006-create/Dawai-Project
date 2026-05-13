import React, { useEffect, useState } from "react";

const MEDICATIONS_KEY = "dawai-medications";
const LOGS_KEY = "dawai-dose-logs";

function Medications() {
  const [medications, setMedications] = useState([]);
  const [form, setForm] = useState({ name: "", dose: "", times: "", notes: "" });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");
  const [takenStatus, setTakenStatus] = useState({});

  useEffect(() => {
    setMedications(JSON.parse(localStorage.getItem(MEDICATIONS_KEY) || "[]"));
    const today = new Date().toISOString().slice(0, 10);
    const logs = JSON.parse(localStorage.getItem(LOGS_KEY) || "[]");
    const todayStatus = logs.reduce((acc, log) => {
      if (log.date === today && log.status === "taken") {
        acc[log.medId] = true;
      }
      return acc;
    }, {});
    setTakenStatus(todayStatus);
  }, []);

  const saveMedications = (nextMedications) => {
    setMedications(nextMedications);
    localStorage.setItem(MEDICATIONS_KEY, JSON.stringify(nextMedications));
  };

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    if (!form.name || !form.dose || !form.times) {
      setError("Please fill all required fields.");
      return;
    }

    setError("");

    if (editId !== null) {
      saveMedications(medications.map((medication) => (
        medication.id === editId ? { ...medication, ...form } : medication
      )));
      setEditId(null);
    } else {
      saveMedications([
        ...medications,
        {
          ...form,
          id: Date.now(),
          status: "Scheduled",
        },
      ]);
    }

    setForm({ name: "", dose: "", times: "", notes: "" });
  };

  const handleEdit = (medication) => {
    setForm({
      name: medication.name,
      dose: medication.dose,
      times: medication.times,
      notes: medication.notes || "",
    });
    setEditId(medication.id);
  };

  const handleDelete = (id) => {
    saveMedications(medications.filter((medication) => medication.id !== id));
  };

  const handleLogDose = (medId) => {
    const today = new Date().toISOString().slice(0, 10);
    const logs = JSON.parse(localStorage.getItem(LOGS_KEY) || "[]");
    const nextLogs = [
      ...logs,
      {
        medId,
        status: "taken",
        date: today,
      },
    ];

    localStorage.setItem(LOGS_KEY, JSON.stringify(nextLogs));
    setTakenStatus({ ...takenStatus, [medId]: true });
  };

  return (
    <div className="min-vh-100 py-5 page-bg">
      <div className="container">
        <div className="text-center mb-5">
          <h1 className="fw-bold mb-0 section-title">Dawai Medications</h1>
          <p className="text-muted mt-2">Manage your health journey locally in the browser.</p>
        </div>

        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="glass-card mb-5 p-4 border-0">
              <h5 className="fw-bold mb-4">{editId ? "Edit Medication" : "Add Medication"}</h5>
              {error && <div className="alert alert-danger py-2">{error}</div>}
              <div className="d-flex flex-column gap-3">
                <input className="form-control" name="name" placeholder="Drug Name *" value={form.name} onChange={handleChange} />
                <input className="form-control" name="dose" placeholder="Dose *" value={form.dose} onChange={handleChange} />
                <input className="form-control" name="times" placeholder="Times (for example 8am, 2pm) *" value={form.times} onChange={handleChange} />
                <textarea className="form-control" name="notes" placeholder="Notes (optional)" rows="2" value={form.notes} onChange={handleChange} />
                <button className="btn w-100 fw-bold py-2 app-primary-button" onClick={handleSubmit}>
                  {editId ? "Update Medication" : "Add Medication"}
                </button>
              </div>
            </div>

            <div className="d-flex flex-column gap-3">
              <h5 className="fw-bold px-2">Today Checklist</h5>
              {medications.length === 0 && (
                <div className="text-center py-5 text-muted opacity-75">No medications added yet.</div>
              )}
              {medications.map((medication) => (
                <div key={medication.id} className="glass-card p-3 border-0">
                  <div className="d-flex justify-content-between align-items-center gap-3 flex-wrap">
                    <div>
                      <div className="d-flex align-items-center gap-2">
                        <button
                          className={`btn btn-sm rounded-circle p-0 d-flex align-items-center justify-content-center ${takenStatus[medication.id] ? "btn-success" : "btn-outline-secondary"}`}
                          style={{ width: "24px", height: "24px" }}
                          onClick={() => handleLogDose(medication.id)}
                          aria-label="Mark dose as taken"
                        >
                          {takenStatus[medication.id] ? "✓" : ""}
                        </button>
                        <h5 className="fw-bold mb-0 section-title">{medication.name}</h5>
                      </div>
                      <div className="d-flex gap-3 text-muted small mt-1 ms-4 flex-wrap">
                        <span>{medication.dose}</span>
                        <span>{medication.times}</span>
                      </div>
                    </div>
                    <div className="d-flex gap-1">
                      <button className="btn btn-link py-0 text-muted" onClick={() => handleEdit(medication)}>Edit</button>
                      <button className="btn btn-link py-0 text-danger" onClick={() => handleDelete(medication.id)}>Delete</button>
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
