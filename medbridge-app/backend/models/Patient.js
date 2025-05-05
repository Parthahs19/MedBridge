import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true },
  dob: { type: Date },
  contactNumber: { type: String },
  address: { type: String },
  medicalHistory: { type: String },   // ✅ Newly added field
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  password: { type: String, required: true },
  role: { type: String, default: 'patient' },
  walletAddress: { type: String },
  privateKey: { type: String },
  patientId: { type: String, unique: true },
}, { timestamps: true });

export default mongoose.model('Patient', patientSchema);

