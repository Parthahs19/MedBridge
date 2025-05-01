// components/ReportView.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const ReportView = () => {
  const { ipfsHash } = useParams();

  // Example IPFS gateway (replace with your gateway if needed)
  const fileUrl = `https://ipfs.io/ipfs/${ipfsHash}`;

  return (
    <div className="container my-4">
      <h2 className="mb-3">Report Viewer</h2>
      <div className="mb-3">
        <Button variant="secondary" as={Link} to="/dashboard">
          Back to Dashboard
        </Button>
      </div>
      <div className="border rounded p-3 shadow-sm bg-light">
        <iframe
          src={fileUrl}
          title="Report"
          width="100%"
          height="600px"
          className="mb-3"
        ></iframe>
        <Button variant="primary" href={fileUrl} target="_blank">
          Download Report
        </Button>
      </div>
    </div>
  );
};

export default ReportView;
