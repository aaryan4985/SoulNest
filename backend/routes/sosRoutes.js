const express = require("express");
const router = express.Router();
const {
  createSOSAlert,
  getSOSAlerts,
  updateSOSAlert,
  getActiveAlertsCount,
} = require("../controllers/sosController");

// Client routes
router.post("/alert", createSOSAlert);

// Admin routes
router.get("/alerts", getSOSAlerts);
router.get("/alerts/count", getActiveAlertsCount);
router.put("/alerts/:id", updateSOSAlert);

module.exports = router;
