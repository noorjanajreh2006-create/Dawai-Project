const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  getMedications,
  createMedication,
  updateMedication,
  deleteMedication,
  logDose,
} = require("../controllers/medicationController");

const router = express.Router();

router.use(authMiddleware);
router.get("/", getMedications);
router.post("/", createMedication);
router.put("/:id", updateMedication);
router.delete("/:id", deleteMedication);
router.post("/:id/log-dose", logDose);

module.exports = router;
