// src/pages/DoctorDashboard/RecordsTable.jsx

import React from 'react';
import './RecordsTable.css';
import { FaEdit } from 'react-icons/fa';

const RecordsTable = ({ records, onEdit, patients = [], doctors = [] }) => {
  // Hardcoded fallback doctor ID for all records
  const fallbackDoctorName = 'DOCTOR-001';

  // Helper functions to get names from ID
  const getPatientName = (id, index) => {
    const patient = patients.find(p => p.patientId === id);
    return patient ? patient.name : `PATIENT-${(index + 1).toString().padStart(3, '0')}`;
  };

  const getDoctorName = (id) => {
    const doctor = doctors.find(d => d.doctorId === id);
    return doctor ? doctor.name : fallbackDoctorName;
  };

  return (
    <div className="records-table-container">
      {records.length === 0 ? (
        <p className="no-records-text">No patient records available. Please add some records.</p>
      ) : (
        <table className="records-table">
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Diagnosis</th>
              <th>Treatment</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record, index) => (
              <tr key={record._id}>
                <td>{getPatientName(record.patientId, index)}</td>
                <td>{record.diagnosis}</td>
                <td>{record.treatment}</td>
                <td>{getDoctorName(record.doctorId)}</td>
                <td>{new Date(record.date).toLocaleDateString()}</td>
                <td>
                  <button className="edit-btn" onClick={() => onEdit(record)}>
                    <FaEdit /> Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RecordsTable;
