// src/components/patient/PendingApprovals.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// ⚠️ Replace with your actual patientId from auth context or JWT
const mockPatientId = 'PATIENT123';

const PendingApprovals = () => {
  const [approvals, setApprovals] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPendingApprovals = async () => {
    try {
      const res = await axios.get(`/api/transferRequest/patient/${mockPatientId}/pendingApprovals`);
      setApprovals(res.data);
    } catch (err) {
      console.error('Error fetching approvals:', err);
    } finally {
      setLoading(false);
    }
  };

  const respondToApproval = async (requestId, action) => {
    const confirm = window.confirm(`Are you sure you want to ${action.toLowerCase()} this request?`);
    if (!confirm) return;

    try {
      await axios.put(`/api/transferRequest/${requestId}/patientApproval`, { action });
      alert(`Request ${action.toLowerCase()}ed successfully!`);
      fetchPendingApprovals();
    } catch (err) {
      console.error('Error updating approval status:', err);
      alert('Failed to update approval status.');
    }
  };

  useEffect(() => {
    fetchPendingApprovals();
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

  const approveBtn = { ...buttonStyle, backgroundColor: '#28a745' };
  const rejectBtn = { ...buttonStyle, backgroundColor: '#dc3545' };

  const cardStyle = {
    backgroundColor: '#ffffff',
    border: '1px solid #d9e2ef',
    borderRadius: '8px',
    padding: '24px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
  };

  if (loading) {
    return <p style={{ padding: '20px', fontSize: '16px' }}>Loading pending approvals...</p>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <div style={cardStyle}>
        <h2 style={{ color: '#003366', marginBottom: '12px' }}>Pending Approvals</h2>

        {approvals.length === 0 ? (
          <p style={{ color: '#555' }}>No pending approvals.</p>
        ) : (
          <table style={tableStyles}>
            <thead>
              <tr>
                <th style={headerCellStyle}>Report ID</th>
                <th style={headerCellStyle}>From Hospital</th>
                <th style={headerCellStyle}>To Hospital</th>
                <th style={headerCellStyle}>Requested By Doctor</th>
                <th style={headerCellStyle}>Status</th>
                <th style={headerCellStyle}>Date Requested</th>
                <th style={headerCellStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {approvals.map((req) => (
                <tr key={req._id}>
                  <td style={thTdStyles}>{req.reportId}</td>
                  <td style={thTdStyles}>{req.hospitalFrom}</td>
                  <td style={thTdStyles}>{req.hospitalTo}</td>
                  <td style={thTdStyles}>{req.doctorId}</td>
                  <td style={thTdStyles}>{req.status}</td>
                  <td style={thTdStyles}>{new Date(req.createdAt).toLocaleDateString()}</td>
                  <td style={thTdStyles}>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button
                        style={approveBtn}
                        onClick={() => respondToApproval(req._id, 'Approve')}
                      >
                        Approve
                      </button>
                      <button
                        style={rejectBtn}
                        onClick={() => respondToApproval(req._id, 'Reject')}
                      >
                        Reject
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

export default PendingApprovals;
