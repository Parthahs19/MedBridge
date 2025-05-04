// routes/doctors.js
import express from 'express';
import  Doctor from '../models/Doctor.js';
import { getDoctorWallet } from '../controllers/doctorController.js';

const router = express.Router();

// GET all doctors
router.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch doctors' });
  }
});

// POST new doctor
router.post('/', async (req, res) => {
  const { name, specialization, phone, email } = req.body;
  if (!name || !specialization) {
    return res.status(400).json({ error: 'Name and specialization are required' });
  }

  try {
    const newDoctor = new Doctor({ name, specialization, phone, email });
    await newDoctor.save();
    res.status(201).json(newDoctor);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create doctor' });
  }
});

router.get('/:id/wallet', getDoctorWallet);

export default router;
