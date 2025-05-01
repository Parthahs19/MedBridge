import express from 'express';
import { Appointment } from '../models/Appointment.js';

const router = express.Router();

// GET all appointments
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
});

export default router;
