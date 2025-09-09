const express = require("express");
const router = express.Router();
const { bookAppointment } = require("../controllers/appointmentController");
const appointmentController= require("../controllers/appointmentController");

router.get("/", appointmentController.getAppointment);

router.post("/send-email", bookAppointment);

module.exports = router;