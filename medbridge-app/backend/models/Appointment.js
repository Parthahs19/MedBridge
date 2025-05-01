import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  doctor: { type: String, required: true },
  notes: { type: String, required: true }
});

export const Appointment = mongoose.model('Appointment', appointmentSchema);
