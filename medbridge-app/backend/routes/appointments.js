// routes/appointmentRoutes.js
import express from 'express';
import {
  getAllAppointments,
  getAppointmentsByPatientId,
  createAppointment,
  deleteAppointment
} from '../controllers/appointmentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/appointments → all appointments
router.get('/', protect, getAllAppointments);

// GET /api/appointments/patient/:patientId → appointments by patientId
router.get('/patient/:patientId', protect, getAppointmentsByPatientId);

// POST /api/appointments → create
router.post('/', protect, createAppointment);

// DELETE /api/appointments/:id → delete
router.delete('/:id', protect, deleteAppointment);

export default router;
