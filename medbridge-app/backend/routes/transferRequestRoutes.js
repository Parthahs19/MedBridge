// routes/transferRequestRoutes.js
import express from 'express';
import {
  createTransferRequest,
  getPatientTransferRequests,
  getDoctorRaisedRequests,
  approveTransferRequest
} from '../controllers/transferRequestController.js';

const router = express.Router();

// Doctor raises request
router.post('/raise', createTransferRequest);

// Patient views all transfer requests for them
router.get('/patient/:patientId', getPatientTransferRequests);

// Doctor views requests they raised
router.get('/doctor/:doctorWallet', getDoctorRaisedRequests);

// Patient approves request
router.post('/approve', approveTransferRequest);

export default router;
