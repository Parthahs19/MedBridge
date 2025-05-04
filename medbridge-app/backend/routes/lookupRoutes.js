// routes/lookupRoutes.js
import express from 'express';
import Doctor from '../models/Doctor.js';
import Patient from '../models/Patient.js';

const router = express.Router();

// Get all doctors
router.get('/doctors', async (req, res) => {
  try {
    const doctors = await Doctor.find().select('_id name email');
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching doctors' });
  }
});

// Get all patients
router.get('/patients', async (req, res) => {
  try {
    const patients = await Patient.find().select('_id name email');
    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching patients' });
  }
});

export default router;
