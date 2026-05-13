import React, { useEffect, useState } from "react";
import { apiRequest } from "../api";

function Medications() {
  const [medications, setMedications] = useState([]);
  const [form, setForm] = useState({ name: "", dose: "", times: "", notes: "" });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");
  const [takenStatus, setTakenStatus] = useState({});

  useEffect(() => {
    apiRequest("/medications")
      .then(setMedications)
      .catch((err) => setError(err.message));
  }, []);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.dose || !form.times) {
      setError("Please fill all required fields.");
      return;
    }

    setError("");

    try {
      if (editId !== null) {
        const updatedMedication = await apiRequest(`/medications/${editId}`, {
          method: "PUT",
          body: JSON.stringify(form),
        });

        setMedications(medications.map((medication) => (
          medication.id === editId ? updatedMedication : medication
        )));
        setEditId(null);
      } else {
        const newMedication = await apiRequest("/medications", {
          method: "POST",
          body: JSON.stringify(form),
        });

        setMedications([newMedication, ...medications]);
      }

      setForm({ name: "", dose: "", times: "", notes: "" });
    } catch (err) {
      setError(err.message);
    }
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

  const handleDelete = async (id) => {
    try {
      await apiRequest(`/medications/${id}`, { method: "DELETE" });
      setMedications(medications.filter((medication) => medication.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogDose = async (medId) => {
    try {
      await apiRequest(`/medications/${medId}/log-dose`, {
        method: "POST",
        body: JSON.stringify({ status: "taken" }),
      });
      setTakenStatus({ ...takenStatus, [medId]: true });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-vh-100 py-5 page-bg">
      <div className="container">
        <div className="text-center mb-5">
          <h1 className="fw-bold mb-0 section-title">Dawai Medications</h1>
          <p className="text-muted mt-2">Manage your health journey with your saved account data.</p>
        </div>

        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="glass-card mb-5 p-4 border-0">
              <h5 className="fw-bold mb-4">{editId ? "Edit Medication" : "Add Medication"}</h5>
              {error && <div className="alert alert-danger py-2">{error}</div>}
              <div className="d-flex flex-column gap-3">
                <input className="form-control" name="name" placeholder="Drug Name *" value={form.name} onChange={handleChange} />
                <input className="form-control" name="dose" placeholder="Dose *" value={form.dose} onChange={handleChange} />
                <input className="form-control" name="times" type="time" value={form.times} onChange={handleChange} />
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
