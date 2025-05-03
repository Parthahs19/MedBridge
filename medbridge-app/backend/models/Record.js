import mongoose from 'mongoose';

const recordSchema = new mongoose.Schema({
  recordId: { type: String, required: true, unique: true },
  date: { type: Date, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  patientId: { type: String, required: true },
  diagnosis: { type: String, required: true },
  treatment: { type: String },
  doctorId: { type: String, required: true },
});

export const Record = mongoose.model('Record', recordSchema);
