import React, { useState } from 'react';
import './AddEditRecordPopup.css';

const AddEditRecordPopup = ({ onClose }) => {
  const [patientName, setPatientName] = useState('');
  const [diagnosis, setDiagnosis] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Record Added/Edited:', { patientName, diagnosis });
    onClose();
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Add / Edit Patient Record</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Patient Name"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            required
          />
          <textarea
            placeholder="Diagnosis Details"
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            required
          />
          <div className="popup-actions">
            <button type="submit">Save Record</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditRecordPopup;
