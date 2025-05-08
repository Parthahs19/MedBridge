import express from 'express';
import { Prescription } from '../models/Prescription.js';

const router = express.Router();

// GET all prescriptions
router.get('/', async (req, res) => {
  try {
    const prescriptions = await Prescription.find().sort({ date: -1 });
    res.json(prescriptions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch prescriptions' });
  }
});

export const getPrescriptionsByPatientId = async (req, res) => {
  const { patientId } = req.params;

  try {
    const prescriptions = await Prescription.find({ patientId }).sort({ date: -1 });
    res.status(200).json(prescriptions);
  } catch (error) {
    console.error('Error fetching prescriptions:', error);
    res.status(500).json({ message: 'Server error fetching prescriptions' });
  }
};

export default router;
