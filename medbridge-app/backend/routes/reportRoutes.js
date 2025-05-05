// reportRoutes.js

import express from 'express';
import { uploadReport, getAllReports } from '../controllers/reportController.js';
import multer from 'multer';

const router = express.Router();

// Use memory storage (not disk) so file.buffer is available
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload', upload.single('file'), uploadReport);
router.get('/', getAllReports);

export default router;
