import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true },
  password: { type: String, required: true },
  specialization: { type: String },
  role: { type: String, default: 'doctor' },
  walletAddress: { type: String },
  privateKey: { type: String },
  doctorId: { type: String, unique: true },
}, { timestamps: true });

export default mongoose.model('Doctor', doctorSchema);
