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

router.use(authMiddleware);
router.get("/", getMedications);
router.post("/", createMedication);
router.get("/dose-logs", getDoseLogs);
router.put("/:id", updateMedication);
router.delete("/:id", deleteMedication);
router.post("/:id/log-dose", logDose);

export default router;