import React, { useState } from 'react';
import axios from 'axios';
import './ipfsUploader.css';

const IPFSUploader = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
        maxBodyLength: 'Infinity',
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          'pinata_api_key': '5220ff05ffd5393e72e1',
          'pinata_secret_api_key': 'db97121818c94c3e499f069c3715cc2866cd9376f0bc96f1342332a52d1936ff'
        }
      });

      console.log('IPFS Hash:', res.data.IpfsHash);
      onUploadSuccess(res.data.IpfsHash);

      alert('✅ File uploaded to IPFS successfully!');
      setFile(null);
    } catch (error) {
      console.error(error);
      alert('❌ Failed to upload file.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="ipfs-uploader">
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload to IPFS"}
      </button>
    </div>
  );
};

export default IPFSUploader;
