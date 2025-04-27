import React from 'react';
import './uploadedFilesList.css';

const UploadedFilesList = ({ files }) => {
  return (
    <div className="uploaded-files">
      <h4>📂 Uploaded Files</h4>
      <ul>
        {files.map((cid, index) => (
          <li key={index}>
            <a href={`https://gateway.pinata.cloud/ipfs/${cid}`} target="_blank" rel="noopener noreferrer">
              View File {index + 1}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UploadedFilesList;
