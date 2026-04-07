import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const dummyMedications = [];

function Medications() {
  const [medications, setMedications] = useState(dummyMedications);
  const [form, setForm] = useState({ name: "", dose: "", times: "", notes: "" });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name || !form.dose || !form.times) {
      setError("Please fill all required fields");
      return;
    }
    setError("");
    if (editId !== null) {
      setMedications(medications.map((m) =>
        m.id === editId ? { ...form, id: editId } : m
      ));
      setEditId(null);
    } else {
      setMedications([...medications, { ...form, id: Date.now() }]);
    }
    setForm({ name: "", dose: "", times: "", notes: "" });
  };

  const handleEdit = (med) => {
    setForm({ name: med.name, dose: med.dose, times: med.times, notes: med.notes });
    setEditId(med.id);
  };

  const handleDelete = (id) => {
    setMedications(medications.filter((m) => m.id !== id));
  };

  return (
    <div className="min-vh-100" style={{ background: "linear-gradient(135deg, #e3f0ff, #e8f5e9)" }}>
      <div className="container py-5">

       
        <div className="text-center mb-4">
          <h2 className="fw-bold" style={{ color: "#1a73e8" }}>
            💊 Dawai | دَوَائي
          </h2>
        </div>

      
        <div className="card shadow-lg border-0 rounded-4 mb-5 p-4">
          <h5 className="fw-bold mb-3">{editId ? "✏️ Edit Medication" : "➕ Add Medication"}</h5>
          {error && <div className="alert alert-danger py-2">{error}</div>}
          <input
            className="form-control mb-3"
            name="name"
            placeholder="Drug Name *"
            value={form.name}
            onChange={handleChange}
          />
          <input
            className="form-control mb-3"
            name="dose"
            placeholder="Dose *"
            value={form.dose}
            onChange={handleChange}
          />
          <input
            className="form-control mb-3"
            name="times"
            placeholder="Times (e.g. 8am, 2pm) *"
            value={form.times}
            onChange={handleChange}
          />
          <input
            className="form-control mb-3"
            name="notes"
            placeholder="Notes (optional)"
            value={form.notes}
            onChange={handleChange}
          />
          <button
            className="btn btn-primary w-100 fw-bold py-2 rounded-3"
            onClick={handleSubmit}
          >
            {editId ? "Update Medication" : "Add Medication"}
          </button>
        </div>

        {}
        {medications.length === 0 && (
          <div className="text-center text-muted">No medications added yet.</div>
        )}
        {medications.map((med) => (
          <div key={med.id} className="card shadow border-0 rounded-4 mb-3 p-3">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h5 className="fw-bold mb-1" style={{ color: "#1a73e8" }}>{med.name}</h5>
                <p className="mb-1 text-muted">💊 Dose: {med.dose}</p>
                <p className="mb-1 text-muted">🕐 Times: {med.times}</p>
                {med.notes && <p className="mb-0 text-muted">📝 Notes: {med.notes}</p>}
              </div>
              <div className="d-flex gap-2">
                <button
                  className="btn btn-warning btn-sm rounded-pill px-3 fw-bold"
                  onClick={() => handleEdit(med)}
                >
                  ✏️ Edit
                </button>
                <button
                  className="btn btn-danger btn-sm rounded-pill px-3 fw-bold"
                  onClick={() => handleDelete(med.id)}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

export default Medications;