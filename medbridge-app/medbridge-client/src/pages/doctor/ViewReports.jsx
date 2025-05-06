// src/pages/DoctorDashboard/ViewReports.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewReports.css';

const ViewReports = ({ patientsList }) => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      const res = await axios.get('/api/reports');
      setReports(res.data);
    };
    fetchReports();
  }, []);

  // Get patient name or fallback to PATIENT-00X
  const getPatientName = (id, index) => {
    const p = patientsList.find(p => p._id === id);
    return p ? p.name : `PATIENT-${(index + 1).toString().padStart(3, '0')}`;
  };

  return (
    <div className="view-reports-container">
      <h3>Uploaded Medical Reports</h3>
      {reports.length === 0 ? (
        <p>No reports uploaded yet.</p>
      ) : (
        <table className="reports-table">
          <thead>
            <tr>
              <th>Patient ID</th>
              <th>Title</th>
              <th>Type</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>IPFS Link</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((r, index) => (
              <tr key={r._id}>
                <td>{getPatientName(r.patientId, index)}</td>
                <td>{r.title}</td>
                <td>{r.reportType}</td>
                <td>{r.doctor}</td>
                <td>{new Date(r.reportDate).toLocaleDateString()}</td>
                <td>
                  <a href={`https://ipfs.io/ipfs/${r.ipfsCid}`} target="_blank" rel="noopener noreferrer">
                    View
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewReports;
