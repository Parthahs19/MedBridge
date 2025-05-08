// routes/recordRoutes.js
import express from 'express';
import {
  getAllRecords,
  getRecordById,
  getRecordsByPatientId,
  createRecord,
  updateRecord,
  deleteRecord
} from '../controllers/recordController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// All records (optional: doctor/admin view)
router.get('/', protect, getAllRecords);

// Patient's own records (secure endpoint)
router.get('/patient/:patientId', protect, getRecordsByPatientId);

// Single record by ID
router.get('/:id', protect, getRecordById);

// Create record
router.post('/', protect, createRecord);

// Update record
router.put('/:id', protect, updateRecord);

// Delete record
router.delete('/:id', protect, deleteRecord);

export default router;
