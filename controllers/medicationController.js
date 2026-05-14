import { Medication, DoseLog } from "../models/index.js";

export async function getMedications(req, res) {
  try {
    const medications = await Medication.findAll({
      where: { userId: req.user.id },
      order: [["createdAt", "DESC"]],
    });

    res.json(medications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function createMedication(req, res) {
  try {
    const { name, dose, times, notes } = req.body;

    if (!name || !dose || !times) {
      return res.status(400).json({ message: "Name, dose, and times are required" });
    }

    const medication = await Medication.create({
      name,
      dose,
      times,
      notes,
      userId: req.user.id,
    });

    res.status(201).json(medication);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function updateMedication(req, res) {
  try {
    const medication = await Medication.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });

    if (!medication) {
      return res.status(404).json({ message: "Medication not found" });
    }

    const { name, dose, times, notes, status } = req.body;

    await medication.update({
      name: name || medication.name,
      dose: dose || medication.dose,
      times: times || medication.times,
      notes,
      status: status || medication.status,
    });

    res.json(medication);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function deleteMedication(req, res) {
  try {
    const deleted = await Medication.destroy({
      where: { id: req.params.id, userId: req.user.id },
    });

    if (!deleted) {
      return res.status(404).json({ message: "Medication not found" });
    }

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function getDoseLogs(req, res) {
  try {
    const date = req.query.date || new Date().toISOString().slice(0, 10);
    const logs = await DoseLog.findAll({
      where: { userId: req.user.id, date },
    });

    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function logDose(req, res) {
  try {
    const medicationId = req.params.id || req.body.medId || req.body.medicationId;
    const medication = await Medication.findOne({
      where: { id: medicationId, userId: req.user.id },
    });

    if (!medication) {
      return res.status(404).json({ message: "Medication not found" });
    }

    const date = req.body.date || new Date().toISOString().slice(0, 10);
    const status = req.body.status || "taken";

    if (!["taken", "missed"].includes(status)) {
      return res.status(400).json({ message: "Status must be taken or missed" });
    }

    const existingLog = await DoseLog.findOne({
      where: {
        medicationId: medication.id,
        userId: req.user.id,
        date,
      },
      order: [["updatedAt", "DESC"]],
    });

    if (existingLog) {
      await existingLog.update({ status });
      return res.json({ success: true, log: existingLog });
    }

    const log = await DoseLog.create({
      medicationId: medication.id,
      userId: req.user.id,
      status,
      date,
    });

    res.status(201).json({ success: true, log });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}