// RaiseRequest.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import { fetchDoctorWallet } from '../../utils/fetchDoctorWallet';

export default function RaiseRequest({ reportList }) {
  const [selectedReport, setSelectedReport] = useState(null);
  const [targetHospitalName, setTargetHospitalName] = useState('');
  const [doctorWallet, setDoctorWallet] = useState('');

  // Fetch doctor wallet on component load
  useEffect(() => {
    const getWallet = async () => {
      try {
        const wallet = await fetchDoctorWallet();
        setDoctorWallet(wallet);
      } catch (err) {
        alert('Error fetching doctor wallet');
      }
    };
    getWallet();
  }, []);

  const handleSelectReport = (e) => {
    const reportId = e.target.value;
    const report = reportList.find(r => r.reportId === reportId);
    setSelectedReport(report);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedReport || !targetHospitalName) {
      alert('Please select a report and enter target hospital');
      return;
    }
    if (!doctorWallet) {
      alert('Doctor wallet not loaded');
      return;
    }

    const payload = {
      patientId: selectedReport.patientId,
      reportId: selectedReport.reportId,
      ipfsCid: selectedReport.ipfsCid,
      hospitalTo:targetHospitalName,
      doctorId:doctorWallet
    };

    try {
      await axios.post('/api/transferRequest/raise', payload);
      alert('Transfer request raised successfully');
      setSelectedReport(null);
      setTargetHospitalName('');
    } catch (err) {
        console.error('Error details:', err);
        if (err.response) {
          console.error('Server responded with:', err.response.data);
          alert(`Error: ${err.response.data.msg || 'Unknown server error'}`);
        } else if (err.request) {
          console.error('Request made but no response:', err.request);
          alert('No response from server. Check server status.');
        } else {
          console.error('Error setting up request:', err.message);
          alert('Error setting up request.');
        }
      }
      
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '15px', borderBottom: '2px solid #1976d2', paddingBottom: '5px', color: '#1976d2' }}>
        Raise Transfer Request
      </h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '450px' }}>
        
        {/* Report Selector */}
        <label style={{ fontWeight: 'bold' }}>Select Report</label>
        <select onChange={handleSelectReport} value={selectedReport ? selectedReport.reportId : ''} required
          style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc', backgroundColor: '#fff' }}>
          <option value="">-- Select Report --</option>
          {reportList.map(rep => (
            <option key={rep.reportId} value={rep.reportId}>
              {rep.title} ({new Date(rep.reportDate).toLocaleDateString()})
            </option>
          ))}
        </select>

        {/* Auto-filled Fields */}
        {selectedReport && (
          <>
            <input value={`Report ID: ${selectedReport.reportId}`} disabled
              style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ddd', backgroundColor: '#f5f5f5' }} />
            <input value={`Patient ID: ${selectedReport.patientId}`} disabled
              style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ddd', backgroundColor: '#f5f5f5' }} />
            <input value={`IPFS CID: ${selectedReport.ipfsCid}`} disabled
              style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ddd', backgroundColor: '#f5f5f5' }} />
          </>
        )}

        {/* Editable Field */}
        <input
          name="targetHospitalName"
          placeholder="Target Hospital Name"
          value={targetHospitalName}
          onChange={(e) => setTargetHospitalName(e.target.value)}
          required
          style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
        />

        <button type="submit"
          style={{ padding: '12px', backgroundColor: '#1976d2', color: '#fff', borderRadius: '6px', border: 'none', fontWeight: 'bold' }}>
          Submit Transfer Request
        </button>

        {/* Wallet info preview (optional for clarity) */}
        {doctorWallet && (
          <small style={{ color: '#1976d2' }}>
            Using Doctor Wallet: {doctorWallet}
          </small>
        )}
      </form>
    </div>
  );
}
