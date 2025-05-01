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

export default router;
