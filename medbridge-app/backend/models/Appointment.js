// models/Appointment.js
import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },   // Reference to Doctor (User)
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },  // Reference to Patient (User)
  reason: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },   // Store time as string like "14:30"
  notes: { type: String }
}, {
  timestamps: true
});

export const Appointment = mongoose.model('Appointment', appointmentSchema);
