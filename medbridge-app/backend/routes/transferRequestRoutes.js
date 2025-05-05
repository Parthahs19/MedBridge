// routes/transferRoutes.js
import express from 'express';
import {
  raiseTransferRequest,
  receiveRequest,
  approveRequest,
  receiveApprovedData,
  getAllRequests,
  requestPatientApproval,
  patientRespondApproval
} from '../controllers/transferRequestController.js';

const router = express.Router();

router.post('/raise', raiseTransferRequest);
router.post('/receiveRequest', receiveRequest);
router.post('/receiveApprovedData', receiveApprovedData);

router.put('/:requestId/approve', approveRequest);
router.put('/:requestId/requestPatientApproval', requestPatientApproval);
router.put('/:requestId/patientRespondApproval', patientRespondApproval);

router.get('/', getAllRequests);

export default router;
