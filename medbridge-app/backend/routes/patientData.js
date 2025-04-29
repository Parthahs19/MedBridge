const express = require('express');
const PatientData = require('./models/PatientData');
const router = express.Router();

// Get patient data by patientId
router.get('/patient/:id', async (req, res) => {
  try {
    const patientData = await PatientData.findById(req.params.id); // Use the patientId here
    res.json(patientData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
