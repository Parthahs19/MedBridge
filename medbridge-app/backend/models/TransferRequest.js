import mongoose from 'mongoose';

const transferRequestSchema = new mongoose.Schema({
  patientId: { type: String, required: true },
  reportId: { type: String, required: true },
  requestedBy: { type: String, required: true },  // Doctor who raised the request
  hospitalFrom: { type: String, required: true }, // Hospital the patient is currently with
  hospitalTo: { type: String, required: true },   // Hospital the patient is being transferred to
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
});

const TransferRequest = mongoose.model('TransferRequest', transferRequestSchema);

export default TransferRequest;
