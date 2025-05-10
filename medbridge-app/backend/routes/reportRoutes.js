// reportRoutes.js

import express from 'express';
import { uploadReport, getAllReports } from '../controllers/reportController.js';
import multer from 'multer';

const router = express.Router();

// Use memory storage (not disk) so file.buffer is available for IPFS upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

/**
 * @route POST /api/reports/upload
 * @desc Upload a report (file + metadata) to IPFS + MongoDB
 */
router.post('/upload', upload.single('file'), uploadReport);

/**
 * @route GET /api/reports
 * @desc Get all reports (or filter by patient using ?patient=patientId)
 */
router.get('/', getAllReports);

export default router;
