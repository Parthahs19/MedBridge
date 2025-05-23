import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import patientData from './routes/patientData.js';
import recordRoutes from './routes/recordRoutes.js';
import prescriptionRoutes from './routes/prescriptionRoutes.js';
import appointmentRoutes from './routes/appointments.js';
import reportRoutes from './routes/reportRoutes.js';
import patientRoutes from './routes/patientRoutes.js';
import doctorRoutes from './routes/doctor.js';
import lookupRoutes from './routes/lookupRoutes.js'
import fileUpload from 'express-fileupload';
import walletRoutes from './routes/walletRoutes.js';
import transferRequestRoutes from './routes/transferRequestRoutes.js';

dotenv.config();
const app = express();

// Connect Database
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(fileUpload());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', patientData);
app.use('/api/records', recordRoutes);
app.use('/api/prescriptions', prescriptionRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/profile', patientRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/lookup', lookupRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/transferRequest',transferRequestRoutes);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
