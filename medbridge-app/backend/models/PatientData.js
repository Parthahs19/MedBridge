// models/PatientData.js
import mongoose from 'mongoose';

const PatientDataSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  },
  visitDate: { type: Date, default: Date.now },
  symptoms: String,
  diagnosis: String,
  prescriptions: [String],
  labReports: [String],
  vitals: {
    temperature: String,
    bloodPressure: String,
    heartRate: String,
    oxygenSaturation: String,
  },
  doctorNotes: String,
}, { timestamps: true });

const PatientData = mongoose.model('PatientData', PatientDataSchema);

export default PatientData;
