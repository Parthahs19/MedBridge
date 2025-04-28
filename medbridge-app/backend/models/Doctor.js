import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true },
  password: { type: String, required: true },
  specialization: { type: String },
  role: { type: String, default: 'doctor' }
});

export default mongoose.model('Doctor', doctorSchema);
