// components/ReportView.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const ReportView = () => {
  const { cid } = useParams();  // Use cid from route param

  const fileUrl = `https://ipfs.io/ipfs/${cid}`;

  return (
    <div className="container my-4">
      <h2 className="mb-3">Report Viewer</h2>
      <div className="mb-3">
        <Button variant="secondary" as={Link} to="/dashboard">
          Back to Dashboard
        </Button>
      </div>
      <p><strong>IPFS CID:</strong> {cid}</p> {/* Optional but informative */}

      <div className="border rounded p-3 shadow-sm bg-light">
        <iframe
          src={fileUrl}
          title="Report"
          width="100%"
          height="600px"
          className="mb-3"
        >
          <p>Your browser does not support embedded documents. <a href={fileUrl} target="_blank" rel="noopener noreferrer">Click here to view the report.</a></p>
        </iframe>
      </div>
    </div>
  );
};

export default ReportView;
