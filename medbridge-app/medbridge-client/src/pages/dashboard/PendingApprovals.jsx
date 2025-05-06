// src/components/patient/PendingApprovals.js
import React, { useEffect, useState } from 'react';

const PendingApprovals = () => {
  const [approvals, setApprovals] = useState([]);
  const [loading, setLoading] = useState(true);

  // Hardcoded data
  const hardcodedApprovals = [
    {
      _id: 'REQ-001',
      patientId: 'P-2034',
      reportId: 'REP-1001',
      hospitalFrom: 'MedBridge',
      hospitalTo: 'H210',
      status: 'Pending',
      patientApproval: 'Pending',
      createdAt: '2025-05-05T00:00:00Z',
      approved: false
    }
  ];

  const fetchPendingApprovals = () => {
    setApprovals(hardcodedApprovals);
    setLoading(false);
  };

  const respondToApproval = (requestId, action) => {
    const confirm = window.confirm(`Are you sure you want to ${action.toLowerCase()} this request?`);
    if (!confirm) return;

    alert(`Request ${action.toLowerCase()}ed successfully!`);

    // Update local state → change status + patientApproval + approved flag
    setApprovals(prev =>
      prev.map(req =>
        req._id === requestId
          ? { ...req, approved: true, status: 'Approved', patientApproval: 'Approved' }
          : req
      )
    );
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
  const approvedBtn = { ...buttonStyle, backgroundColor: '#6c757d', cursor: 'default' };

  const cardStyle = {
    backgroundColor: '#ffffff',
    border: '1px solid #d9e2ef',
    borderRadius: '8px',
    padding: '24px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
  };

  // 👇 helper to style Approved text green
  const getStatusCellStyle = (value) => ({
    ...thTdStyles,
    color: value === 'Approved' ? '#28a745' : '#333',
    fontWeight: value === 'Approved' ? '600' : 'normal'
  });

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
              {approvals.map((req) => (
                <tr key={req._id}>
                  <td style={thTdStyles}>{req.patientId}</td>
                  <td style={thTdStyles}>{req.reportId}</td>
                  <td style={thTdStyles}>{req.hospitalFrom}</td>
                  <td style={thTdStyles}>{req.hospitalTo}</td>

                  {/* Status + Patient Approval with color */}
                  <td style={getStatusCellStyle(req.status)}>{req.status}</td>
                  <td style={getStatusCellStyle(req.patientApproval)}>{req.patientApproval}</td>

                  <td style={thTdStyles}>{new Date(req.createdAt).toLocaleDateString()}</td>
                  <td style={thTdStyles}>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      {!req.approved ? (
                        <button
                          style={approveBtn}
                          onClick={() => respondToApproval(req._id, 'Approve')}
                        >
                          Approve
                        </button>
                      ) : (
                        <button style={approvedBtn} disabled>
                          Approved
                        </button>
                      )}
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
