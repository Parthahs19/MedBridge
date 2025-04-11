import React, { useState } from 'react';
import axios from 'axios';
import './UploadRecord.css'; // Custom styling

const UploadRecord = () => {
  const [file, setFile] = useState(null);
  const [patientAddress, setPatientAddress] = useState('');
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !patientAddress) {
      return alert('All fields are required!');
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('patientAddress', patientAddress);

    try {
      setUploading(true);
      const token = localStorage.getItem('token'); // Access token
      const res = await axios.post(
        'http://localhost:5000/api/records/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
          },
        }
      );
      setMessage('✅ Uploaded Successfully!');
    } catch (err) {
      console.error(err);
      setMessage('❌ Upload failed.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="upload-container">
      <h2>📤 Upload Medical Record</h2>
      <form onSubmit={handleSubmit} className="upload-form">
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <input
          type="text"
          placeholder="Enter Patient Wallet Address"
          value={patientAddress}
          onChange={(e) => setPatientAddress(e.target.value)}
        />
        <button type="submit" disabled={uploading}>
          {uploading ? 'Uploading...' : 'Upload Record'}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UploadRecord;
