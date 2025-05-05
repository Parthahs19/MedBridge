// models/TransferRequest.js (updated)
import mongoose from 'mongoose';

const transferRequestSchema = new mongoose.Schema({
  patientId: { type: String, required: true },
  reportId: { type: String, required: true },
  doctorId: { type: String, required: true },
  requestedBy: { type: String, required: true },
  hospitalFrom: { type: String, required: true },
  hospitalTo: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  patientApprovalStatus: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  approvedDataCid: { type: String },
  remarks: { type: String },
  ipfsCid: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const TransferRequest = mongoose.model('TransferRequest', transferRequestSchema);

export default TransferRequest;

