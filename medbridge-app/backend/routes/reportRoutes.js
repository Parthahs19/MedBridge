import express from 'express';
import { uploadReport, getAllReports } from '../controllers/reportController.js';

const router = express.Router();

router.post('/upload', uploadReport);
router.get('/', getAllReports);

export default router;
