// src/components/doctor/ViewReceivedRequests.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewReceivedRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReceivedRequests = async () => {
    try {
      const res = await axios.get('/api/transferRequest');
      setRequests(res.data);
    } catch (err) {
      console.error('Error fetching received requests:', err);
    } finally {
      setLoading(false);
    }
  };

  const sendPatientApprovalRequest = async (requestId) => {
    const confirm = window.confirm('Send request to patient for approval?');
    if (!confirm) return;

    try {
      await axios.put(`/api/transferRequest/${requestId}/requestPatientApproval`);
      alert('Patient approval request sent!');
      fetchReceivedRequests();
    } catch (err) {
      console.error('Error sending patient approval request:', err);
      alert('Failed to send patient approval request.');
    }
  };

  const approveRequest = async (requestId) => {
    const confirm = window.confirm('Are you sure you want to approve this request?');
    if (!confirm) return;

    try {
      await axios.put(`/api/transferRequest/${requestId}/approve`);
      alert('Request approved successfully!');
      fetchReceivedRequests();
    } catch (err) {
      console.error('Error approving request:', err);
      alert('Failed to approve request.');
    }
  };

  useEffect(() => {
    fetchReceivedRequests();
  }, []);

  const tableStyles = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '16px'
  };

  const thTdStyles = {
    border: '1px solid #e0e0e0',
    padding: '10px',
    textAlign: 'left'
  };

  const headerCellStyle = {
    ...thTdStyles,
    backgroundColor: '#e8f0fe',
    color: '#003366',
    fontWeight: '600'
  };

  const buttonStyle = {
    padding: '6px 12px',
    border: 'none',
    borderRadius: '4px',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'all 0.2s ease'
  };

  const requestBtnStyle = {
    ...buttonStyle,
    backgroundColor: '#007BFF'
  };

  const approveBtnStyleEnabled = {
    ...buttonStyle,
    backgroundColor: '#28a745'
  };

  const approveBtnStyleDisabled = {
    ...buttonStyle,
    backgroundColor: '#cccccc',
    cursor: 'not-allowed'
  };

  const badgeStyle = (status) => {
    let colors = {
      Pending: { bg: '#fff3cd', color: '#856404' },
      Approved: { bg: '#d4edda', color: '#155724' },
      Rejected: { bg: '#f8d7da', color: '#721c24' }
    };
    return {
      display: 'inline-block',
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: '600',
      color: colors[status]?.color,
      backgroundColor: colors[status]?.bg
    };
  };

  const cardStyle = {
    backgroundColor: '#ffffff',
    border: '1px solid #d9e2ef',
    borderRadius: '8px',
    padding: '24px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
  };

  if (loading) {
    return <p style={{ padding: '20px', fontSize: '16px' }}>Loading received requests...</p>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <div style={cardStyle}>
        <h2 style={{ color: '#003366', marginBottom: '12px' }}>Received Transfer Requests</h2>

        {requests.length === 0 ? (
          <p style={{ color: '#555' }}>No received requests at the moment.</p>
        ) : (
          <table style={tableStyles}>
            <thead>
              <tr>
                <th style={headerCellStyle}>Patient ID</th>
                <th style={headerCellStyle}>Report ID</th>
                <th style={headerCellStyle}>From Hospital</th>
                <th style={headerCellStyle}>To Hospital</th>
                <th style={headerCellStyle}>Status</th>
                <th style={headerCellStyle}>Patient Approval</th>
                <th style={headerCellStyle}>Date Requested</th>
                <th style={headerCellStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req._id} style={{ backgroundColor: '#fff', transition: 'background 0.3s' }}>
                  <td style={thTdStyles}>{req.patientId}</td>
                  <td style={thTdStyles}>{req.reportId}</td>
                  <td style={thTdStyles}>{req.hospitalFrom}</td>
                  <td style={thTdStyles}>{req.hospitalTo}</td>
                  <td style={thTdStyles}>
                    <span style={badgeStyle(req.status)}>{req.status}</span>
                  </td>
                  <td style={thTdStyles}>
                    <span style={badgeStyle(req.patientApprovalStatus)}>
                      {req.patientApprovalStatus}
                    </span>
                  </td>
                  <td style={thTdStyles}>
                    {new Date(req.createdAt).toLocaleDateString()}
                  </td>
                  <td style={thTdStyles}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <button
                        onClick={() => sendPatientApprovalRequest(req._id)}
                        style={requestBtnStyle}
                      >
                        Request Patient Approval
                      </button>

                      <button
                        onClick={() => approveRequest(req._id)}
                        disabled={req.patientApprovalStatus !== 'Approved'}
                        style={req.patientApprovalStatus === 'Approved'
                          ? approveBtnStyleEnabled
                          : approveBtnStyleDisabled}
                      >
                        Approve Transfer
                      </button>
                    </div>
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

export default ViewReceivedRequests;
