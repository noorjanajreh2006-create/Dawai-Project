import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import {
  getMedications,
  createMedication,
  updateMedication,
  deleteMedication,
  getDoseLogs,
  logDose,
} from "../controllers/medicationController.js";

const router = express.Router();

// Protect all medication routes using authentication middleware
router.use(authMiddleware);

// Get all medications for the logged-in user
router.get("/", getMedications);

// Create a new medication
router.post("/", createMedication);

// Get dose logs for medications
router.get("/dose-logs", getDoseLogs);

// Update medication by id
router.put("/:id", updateMedication);

// Delete medication by id
router.delete("/:id", deleteMedication);

// Log medication dose as taken or missed
router.post("/:id/log-dose", logDose);

export default router;