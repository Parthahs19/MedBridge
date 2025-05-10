// routes/prescriptionRoutes.js
import express from 'express';
import { getAllPrescriptions, getPrescriptionsByPatientId } from '../controllers/prescriptionController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route GET /api/prescriptions  → All prescriptions (admin or doctor)
router.get('/', protect, getAllPrescriptions);

// @route GET /api/prescriptions/patient/:patientId → Patient's prescriptions
router.get('/patient/:patientId', protect, getPrescriptionsByPatientId);

export default router;
