// backend/routes/recordRoutes.js
const express = require("express");
const router = express.Router();
const { addRecord, getRecords } = require("../controllers/recordController");
const { protect } = require("../middleware/auth");

// Doctor/Admin can add
router.post("/add", protect(["Doctor", "Admin"]), addRecord);

// Patients, Doctors, Admins can view
router.get("/:patientAddress", protect(["Patient", "Doctor", "Admin"]), getRecords);

module.exports = router;
