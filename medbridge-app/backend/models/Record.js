// backend/models/Record.js
const mongoose = require("mongoose");

const RecordSchema = new mongoose.Schema({
  patientAddress: { type: String, required: true },
  ipfsHash: { type: String, required: true },
  uploadedBy: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Record", RecordSchema);
