import mongoose from 'mongoose';

const prescriptionSchema = new mongoose.Schema({
  patientId: { type: String, required: true },
  date: { type: Date, required: true },
  doctor: { type: String, required: true },
  summary: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

export const Prescription = mongoose.model('Prescription', prescriptionSchema);
