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

  const getPatientName = (id) => {
    const p = patientsList.find(p => p._id === id);
    return p ? p.name : 'Unknown';
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
              <th>Patient</th>
              <th>Title</th>
              <th>Type</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>IPFS Link</th>
            </tr>
          </thead>
          <tbody>
            {reports.map(r => (
              <tr key={r._id}>
                <td>{getPatientName(r.patientId)}</td>
                <td>{r.title}</td>
                <td>{r.reportType}</td>
                <td>{r.doctor}</td>
                <td>{new Date(r.reportDate).toLocaleDateString()}</td>
                <td><a href={`https://ipfs.io/ipfs/${r.ipfsCid}`} target="_blank" rel="noopener noreferrer">View</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewReports;
