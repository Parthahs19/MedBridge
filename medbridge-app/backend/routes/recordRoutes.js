import express from 'express';
import { getAllRecords } from '../controllers/recordController.js';

const router = express.Router();

router.get('/', getAllRecords);

export default router;
