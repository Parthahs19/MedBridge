import express from 'express';
import Report from '../models/Report.js';

const router = express.Router();

// GET all reports
router.get('/', async (req, res) => {
  try {
    const reports = await Report.find().sort({ date: -1 }); // Latest first
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: 'Server error fetching reports' });
  }
});

export default router;