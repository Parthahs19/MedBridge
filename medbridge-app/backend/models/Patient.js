import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true },
  dob: {type: Date},
  gender: {type: String, enum: ['Male', 'Female', 'Other']},
  password: { type: String, required: true },
  role: { type: String, default: 'patient' },
  contactNumber: {type: String,},
  address: {type: String}
}, { timestamps: true });

export default mongoose.model('Patient', patientSchema);
