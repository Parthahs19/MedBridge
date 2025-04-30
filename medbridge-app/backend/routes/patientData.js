import express from 'express';
import PatientData from '../models/PatientData.js';

const router = express.Router();

// Get patient data by patientId
router.get('/patient/:id', async (req, res) => {
  try {
    const patientData = await PatientData.findOne({ patientId: req.params.id });
    if (!patientData) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.json(patientData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

