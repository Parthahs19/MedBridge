// src/pages/DoctorDashboard/RecordsTable.jsx

import React from 'react';
import './RecordsTable.css';
import { FaEdit } from 'react-icons/fa';

const RecordsTable = ({ records, onEdit, patients = [], doctors = [] }) => {
  // Helper functions to get names from ID
  const getPatientName = (id) => {
    const patient = patients.find(p => p._id === id);
    return patient ? patient.name : 'Unknown';
  };

  const getDoctorName = (id) => {
    const doctor = doctors.find(d => d._id === id);
    return doctor ? doctor.name : 'Unknown';
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
            {records.map((record) => (
              <tr key={record._id}>
                <td>{getPatientName(record.patientId)}</td>
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

