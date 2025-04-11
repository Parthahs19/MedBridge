// src/pages/ViewRecords.js
import React, { useState } from 'react';
import axios from 'axios';
import './ViewRecords.css';

const ViewRecords = () => {
  const [records, setRecords] = useState([]);
  const [address, setAddress] = useState('');
  const [status, setStatus] = useState('');

  const fetchRecords = async () => {
    setStatus('Fetching records...');

    try {
      const res = await axios.get(`http://localhost:5000/api/records/${address}`);
      setRecords(res.data.records);
      setStatus(`Fetched ${res.data.records.length} record(s).`);
    } catch (error) {
      console.error(error);
      setStatus('Error fetching records');
    }
  };

  return (
    <div className="view-container">
      <h2>View Medical Records</h2>

      <div className="form-section">
        <input
          type="text"
          placeholder="Enter patient address or leave blank for self"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button onClick={fetchRecords}>Get Records</button>
      </div>

      {status && <p className="status">{status}</p>}

      <div className="records-table">
        {records.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Uploaded By</th>
                <th>Timestamp</th>
                <th>IPFS Link</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{record.uploadedBy}</td>
                  <td>{new Date(record.timestamp * 1000).toLocaleString()}</td>
                  <td>
                    <a
                      href={`https://ipfs.io/ipfs/${record.ipfsHash}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View File
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ViewRecords;
