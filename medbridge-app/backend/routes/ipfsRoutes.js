// backend/routes/ipfsRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadRecord } = require('../controllers/ipfsController');

const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', upload.single('file'), uploadRecord);

module.exports = router;
