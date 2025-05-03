// src/pages/DoctorDashboard/AddEditRecordPopup.jsx

import React, { useState, useEffect } from 'react';
import './AddEditRecordPopup.css';

const AddEditRecordPopup = ({ initialData, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    recordId: '',
    patientName: '',
    diagnosis: '',
    treatment: '',
    doctorName: '',
    date: '',
  });

  // Populate form fields when editing OR clear for Add
  useEffect(() => {
    if (initialData) {
      setFormData({
        recordId: initialData.recordId || '',
        patientName: initialData.patientName || '',
        diagnosis: initialData.diagnosis || '',
        treatment: initialData.treatment || '',
        doctorName: initialData.doctorName || '',
        date: initialData.date ? initialData.date.substring(0, 10) : '', // Format date input YYYY-MM-DD
      });
    } else {
      setFormData({
        recordId: '',
        patientName: '',
        diagnosis: '',
        treatment: '',
        doctorName: '',
        date: '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="popup-overlay">
      <div className="popup-card">
        <h3>{initialData ? 'Edit Record' : 'Add New Record'}</h3>
        <form onSubmit={handleSubmit}>

          <label>Patient Name</label>
          <input
            type="text"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            required
          />

          <label>Diagnosis</label>
          <input
            type="text"
            name="diagnosis"
            value={formData.diagnosis}
            onChange={handleChange}
            required
          />

          <label>Treatment</label>
          <input
            type="text"
            name="treatment"
            value={formData.treatment}
            onChange={handleChange}
            required
          />

          <label>Doctor Name</label>
          <input
            type="text"
            name="doctorName"
            value={formData.doctorName}
            onChange={handleChange}
            required
          />

          <label>Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />

          <div className="popup-actions">
            <button type="submit" className="save-btn">
              {initialData ? 'Update Record' : 'Add Record'}
            </button>
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddEditRecordPopup;
