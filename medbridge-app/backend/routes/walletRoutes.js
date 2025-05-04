// routes/walletRoutes.js
import express from 'express';
import { generateWallet } from '../controllers/walletController.js';

const router = express.Router();

router.post('/generate', generateWallet);

export default router;
