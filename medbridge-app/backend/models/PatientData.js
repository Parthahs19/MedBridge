// models/PatientData.js
const mongoose = require('mongoose');

const PatientDataSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  },
  visitDate: {
    type: Date,
    default: Date.now,
  },
  symptoms: {
    type: String,
  },
  diagnosis: {
    type: String,
  },
  prescriptions: {
    type: [String],
  },
  labReports: {
    type: [String], // You can store IPFS hashes or URLs here
  },
  vitals: {
    temperature: String,
    bloodPressure: String,
    heartRate: String,
    oxygenSaturation: String,
  },
  doctorNotes: {
    type: String,
  }
}, { timestamps: true });

module.exports = mongoose.model('PatientData', PatientDataSchema);
