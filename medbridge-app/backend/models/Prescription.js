import mongoose from 'mongoose';

const prescriptionSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  doctor: { type: String, required: true },
  summary: { type: String, required: true }
});

export const Prescription = mongoose.model('Prescription', prescriptionSchema);
