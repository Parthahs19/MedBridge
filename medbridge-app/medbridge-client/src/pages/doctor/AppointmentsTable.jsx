// src/pages/Doctor/AppointmentsTable.jsx
import React from 'react';

const AppointmentsTable = ({ appointments, doctors, patients, onEdit }) => {
  // Helper functions to get name by ID
  const getPatientName = (id) => {
    const patient = patients.find((p) => p._id === id);
    return patient ? patient.name : 'Unknown';
  };

  const getDoctorName = (id) => {
    const doctor = doctors.find((d) => d._id === id);
    return doctor ? doctor.name : 'Unknown';
  };

  return (
    <table className="records-table" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
      <thead>
        <tr style={{ background: '#1f4172', color: 'white' }}>
          <th style={thStyle}>Patient Name</th>
          <th style={thStyle}>Doctor Name</th>
          <th style={thStyle}>Date</th>
          <th style={thStyle}>Time</th>
          <th style={thStyle}>Reason</th>
          <th style={thStyle}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {appointments.map((a) => (
          <tr key={a._id} style={{ background: '#fff', borderBottom: '1px solid #ddd' }}>
            <td style={tdStyle}>{getPatientName(a.patient)}</td>
            <td style={tdStyle}>{getDoctorName(a.doctor)}</td>
            <td style={tdStyle}>{new Date(a.date).toLocaleDateString()}</td>
            <td style={tdStyle}>{a.time}</td>
            <td style={tdStyle}>{a.reason}</td>
            <td style={tdStyle}>
              <button
                style={editButtonStyle}
                onClick={() => onEdit(a)}
              >
                Edit
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// Inline styles
const thStyle = {
  padding: '12px',
  textAlign: 'left',
  fontWeight: '600'
};

const tdStyle = {
  padding: '12px',
  color: '#333'
};

const editButtonStyle = {
  background: '#1f4172',
  color: '#fff',
  border: 'none',
  padding: '6px 12px',
  borderRadius: '6px',
  cursor: 'pointer',
  transition: 'background 0.3s ease'
};

export default AppointmentsTable;
