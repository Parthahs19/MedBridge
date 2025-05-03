// models/Appointment.js
import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  doctor: { type: String, required: true },
  patient: { type: String, required: true },
  notes: { type: String },
  date: { type: Date, required: true }
});

export const Appointment = mongoose.model('Appointment', appointmentSchema);
