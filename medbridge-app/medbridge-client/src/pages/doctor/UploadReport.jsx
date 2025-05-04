import React, { useState } from 'react';
import axios from 'axios';
import './UploadReport.css';

const UploadReport = ({ patientsList }) => {
  const [formData, setFormData] = useState({
    patientId: '',
    title: '',
    description: '',
    reportDate: '',
    doctor: '',
    reportType: 'Other',
    remarks: '',
    file: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      data.append(key, formData[key]);
    });

    try {
      await axios.post('/api/reports/upload', data);
      alert('Report uploaded successfully!');
      setFormData({ patientId: '', title: '', description: '', reportDate: '', doctor: '', reportType: 'Other', remarks: '', file: null });
    } catch (err) {
      console.error(err);
      alert('Failed to upload report');
    }
  };

  return (
    <div className="upload-report-container">
      <h3>Upload Medical Report</h3>
      <form onSubmit={handleSubmit} className="upload-report-form">
        <label>Patient</label>
        <select name="patientId" value={formData.patientId} onChange={handleChange} required>
          <option value="">Select Patient</option>
          {patientsList.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
        </select>

        <label>Title</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} required />

        <label>Description</label>
        <textarea name="description" value={formData.description} onChange={handleChange} />

        <label>Report Date</label>
        <input type="date" name="reportDate" value={formData.reportDate} onChange={handleChange} required />

        <label>Doctor Name</label>
        <input type="text" name="doctor" value={formData.doctor} onChange={handleChange} required />

        <label>Report Type</label>
        <select name="reportType" value={formData.reportType} onChange={handleChange}>
          <option>Lab Report</option>
          <option>Radiology</option>
          <option>Cardiology</option>
          <option>Pathology</option>
          <option>Other</option>
        </select>

        <label>Remarks</label>
        <input type="text" name="remarks" value={formData.remarks} onChange={handleChange} />

        <label>Upload File</label>
        <input type="file" name="file" accept="*" onChange={handleChange} required />

        <button type="submit">Upload Report</button>
      </form>
    </div>
  );
};

export default UploadReport;
