// src/components/doctor/ViewReceivedRequests.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Function to upload file to Pinata (fixed endpoint)
const uploadToPinata = async (file) => {
  const PINATA_API_KEY = "7957cb6c182c9ec3113e";
  const PINATA_SECRET_API_KEY = "47d24a839795854cabd1e39bd1e422aa6f064781d0e303630d72cf318b656237";

  if (!PINATA_API_KEY || !PINATA_SECRET_API_KEY) {
    alert('Pinata API credentials are missing. Please check your .env file.');
    return null;
  }

  const formData = new FormData();
  formData.append('file', file);

  const metadata = JSON.stringify({
    name: file.name,
  });
  formData.append('pinataMetadata', metadata);

  const options = JSON.stringify({
    cidVersion: 1,
  });
  formData.append('pinataOptions', options);

  try {
    const res = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_SECRET_API_KEY,
      },
    });
    alert(`File uploaded successfully! CID: ${res.data.IpfsHash}`);
    return res.data.IpfsHash;
  } catch (err) {
    console.error('Error uploading file to Pinata:', err);
    alert('Failed to upload file to Pinata.');
    return null;
  }
};

const ViewReceivedRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReceivedRequests = async () => {
    try {
      const res = await axios.get('/api/transferRequest'); // Fetch from backend
      setRequests(res.data);
    } catch (err) {
      console.error('Error fetching received requests:', err);
    } finally {
      setLoading(false);
    }
  };

  const simulatePatientApproval = (requestId) => {
    alert('Requesting approval from patient...');
    setRequests((prevRequests) =>
      prevRequests.map((req) =>
        req._id === requestId
          ? { ...req, patientApprovalStatus: 'Pending' }
          : req
      )
    );

    setTimeout(() => {
      setRequests((prevRequests) =>
        prevRequests.map((req) =>
          req._id === requestId
            ? { ...req, patientApprovalStatus: 'Approved' }
            : req
        )
      );
      alert('Patient approval received!');
    }, 10000); // Instant for demo (set to 10000 for real 10s delay)
  };

  const approveRequestFrontendAndBackend = async (requestId) => {
    const request = requests.find((req) => req._id === requestId);

    if (!request || !request.file) {
      alert('No file selected for this request. Please upload a file first.');
      return;
    }

    const file = request.file;
    const cid = await uploadToPinata(file);

    if (cid) {
      // Update frontend
      setRequests((prevRequests) =>
        prevRequests.map((req) =>
          req._id === requestId
            ? { ...req, fileCid: cid, status: 'Approved' }
            : req
        )
      );

      // Update backend
      try {
        await axios.put(`/api/transferRequest/${requestId}`, {
          status: 'Approved',
          fileCid: cid,
        });
        alert('Transfer approved and updated in backend successfully!');
      } catch (err) {
        console.error('Error updating backend status:', err);
        alert('File uploaded');
      }
    } else {
      alert('Failed to upload file to Pinata. Transfer not approved.');
    }
  };

  const handleFileUpload = (e, requestId) => {
    const file = e.target.files[0];
    if (file) {
      setRequests((prevRequests) =>
        prevRequests.map((req) =>
          req._id === requestId ? { ...req, file } : req
        )
      );
    }
  };

  useEffect(() => {
    fetchReceivedRequests();
  }, []);

  const tableStyles = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '16px',
  };

  const thTdStyles = {
    border: '1px solid #e0e0e0',
    padding: '10px',
    textAlign: 'left',
  };

  const headerCellStyle = {
    ...thTdStyles,
    backgroundColor: '#e8f0fe',
    color: '#003366',
    fontWeight: '600',
  };

  const buttonStyle = {
    padding: '6px 12px',
    border: 'none',
    borderRadius: '4px',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'all 0.2s ease',
  };

  const requestBtnStyle = {
    ...buttonStyle,
    backgroundColor: '#007BFF',
  };

  const approveBtnStyleEnabled = {
    ...buttonStyle,
    backgroundColor: '#28a745',
  };

  const approveBtnStyleDisabled = {
    ...buttonStyle,
    backgroundColor: '#cccccc',
    cursor: 'not-allowed',
  };

  const badgeStyle = (status) => {
    let colors = {
      Pending: { bg: '#fff3cd', color: '#856404' },
      Approved: { bg: '#d4edda', color: '#155724' },
      Rejected: { bg: '#f8d7da', color: '#721c24' },
    };
    return {
      display: 'inline-block',
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: '600',
      color: colors[status]?.color,
      backgroundColor: colors[status]?.bg,
    };
  };

  const cardStyle = {
    backgroundColor: '#ffffff',
    border: '1px solid #d9e2ef',
    borderRadius: '8px',
    padding: '24px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
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
                        onClick={() => simulatePatientApproval(req._id)}
                        style={requestBtnStyle}
                      >
                        Request Patient Approval
                      </button>

                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          approveRequestFrontendAndBackend(req._id);
                        }}
                        disabled={req.patientApprovalStatus !== 'Approved'}
                        style={
                          req.patientApprovalStatus === 'Approved'
                            ? approveBtnStyleEnabled
                            : approveBtnStyleDisabled
                        }
                      >
                        Approve Transfer
                      </button>

                      <input
                        type="file"
                        onChange={(e) => handleFileUpload(e, req._id)}
                        style={{ marginTop: '8px' }}
                      />
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
