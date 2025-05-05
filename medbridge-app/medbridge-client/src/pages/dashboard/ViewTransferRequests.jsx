// src/pages/Patient/ViewTransferRequests.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewTransferRequests = ({ patientId }) => {
    console.log(patientId);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`/api/transferRequest/patient/${patientId}`);
      setRequests(res.data);gf
    } catch (err) {
      console.error('Error fetching transfer requests:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (requestId, action) => {
    try {
      await axios.put(`/api/transferRequests/${requestId}/status`, { status: action });
      fetchRequests(); // Refresh after action
    } catch (err) {
      console.error('Error updating request:', err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading) return <p>Loading transfer requests...</p>;

  const containerStyle = {
    padding: '20px',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
  };

  const thTdStyle = {
    padding: '8px 12px',
    border: '1px solid #ddd',
    textAlign: 'left',
  };

  const approveBtnStyle = {
    backgroundColor: '#4caf50',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    marginRight: '5px',
    cursor: 'pointer',
  };

  const rejectBtnStyle = {
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
  };

  return (
    <div style={containerStyle}>
      <h3>Incoming Transfer Requests</h3>
      {requests.length === 0 ? (
        <p>No transfer requests at the moment.</p>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thTdStyle}>Doctor Wallet</th>
              <th style={thTdStyle}>Target Hospital</th>
              <th style={thTdStyle}>IPFS CID</th>
              <th style={thTdStyle}>Status</th>
              <th style={thTdStyle}>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(req => (
              <tr key={req._id}>
                <td style={thTdStyle}>{req.doctorWallet}</td>
                <td style={thTdStyle}>{req.targetHospital}</td>
                <td style={thTdStyle}>
                  <a
                    href={`https://ipfs.io/ipfs/${req.ipfsCid}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {req.ipfsCid.slice(0, 10)}...
                  </a>
                </td>
                <td style={thTdStyle}>
                  <strong>{req.status}</strong>
                </td>
                <td style={thTdStyle}>
                  {req.status === 'pending' ? (
                    <>
                      <button
                        style={approveBtnStyle}
                        onClick={() => handleAction(req._id, 'approved')}
                      >
                        Approve ✅
                      </button>
                      <button
                        style={rejectBtnStyle}
                        onClick={() => handleAction(req._id, 'rejected')}
                      >
                        Reject ❌
                      </button>
                    </>
                  ) : (
                    <em>{req.status.toUpperCase()}</em>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewTransferRequests;
