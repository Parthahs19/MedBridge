import express from 'express';
import {
  getAllRecords,
  getRecordById,
  createRecord,
  updateRecord,
  deleteRecord,
} from '../controllers/recordController.js';

const router = express.Router();

// Routes
router.get('/', getAllRecords);          // Get all records
router.get('/:id', getRecordById);       // Get single record by ID
router.post('/', createRecord);          // Create new record
router.put('/:id', updateRecord);        // Update record by ID
router.delete('/:id', deleteRecord);     // Delete record by ID

export default router;
