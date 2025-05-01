import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
    reportId: { type: String, required: true, unique: true },
    patientId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    reportDate: { type: Date, required: true },
    doctor: { type: String, required: true },
    reportType: { type: String, enum: ['Lab Report', 'Radiology', 'Cardiology', 'Pathology', 'Other'], default: 'Other' },
    ipfsCid: { type: String, required: true },   // <<== Store only CID
    remarks: { type: String }
  }, { timestamps: true });
  
const Report = mongoose.model('Report', reportSchema);

export default Report;
