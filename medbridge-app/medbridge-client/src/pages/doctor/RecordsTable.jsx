// src/pages/DoctorDashboard/RecordsTable.jsx

import React from 'react';
import './RecordsTable.css';
import { FaEdit } from 'react-icons/fa';

const RecordsTable = ({ records, onEdit }) => {
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
                <td>{record.patientName}</td>
                <td>{record.diagnosis}</td>
                <td>{record.treatment}</td>
                <td>{record.doctorName}</td>
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
