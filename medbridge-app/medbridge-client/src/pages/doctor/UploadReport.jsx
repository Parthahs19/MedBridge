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
    if (name === 'file') {
      setFormData({ ...formData, file: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.patientId || !formData.title || !formData.reportDate || !formData.doctor || !formData.file) {
      alert('Please fill all required fields and upload a file.');
      return;
    }

    const data = new FormData();
    data.append('patientId', formData.patientId);
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('reportDate', formData.reportDate);
    data.append('doctor', formData.doctor);
    data.append('reportType', formData.reportType);
    data.append('remarks', formData.remarks);
    data.append('file', formData.file);

    // Debug: log FormData entries
    for (let pair of data.entries()) {
      console.log(pair[0] + ':', pair[1]);
    }

    try {
      await axios.post('/api/reports/upload', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Report uploaded successfully!');
      // Reset form
      setFormData({
        patientId: '',
        title: '',
        description: '',
        reportDate: '',
        doctor: '',
        reportType: 'Other',
        remarks: '',
        file: null
      });
      // Reset file input manually
      document.getElementById('fileInput').value = '';
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
          {patientsList.map(p => (
            <option key={p._id} value={p._id}>{p.name}</option>
          ))}
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
        <input id="fileInput" type="file" name="file" accept="*" onChange={handleChange} required />

        <button type="submit">Upload Report</button>
      </form>
    </div>
  );
};

export default UploadReport;
