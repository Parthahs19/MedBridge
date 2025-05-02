import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, Spinner, Alert } from 'react-bootstrap';

const ReportView = () => {
  const { reportId } = useParams();   // We pass reportId (not CID directly)

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/reports/${reportId}`);
        if (!res.ok) throw new Error('Failed to fetch report');
        const data = await res.json();
        setReport(data);
      } catch (err) {
        console.error(err);
        setError('Could not load report details');
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [reportId]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error || !report) {
    return <Alert variant="danger" className="m-4">{error}</Alert>;
  }

  const fileUrl = `https://ipfs.io/ipfs/${report.ipfsCid}`;

  // If it's a Word file (doc or docx), use Google Docs Viewer
  const embedUrl =
    report.fileType === 'pdf'
      ? fileUrl
      : `https://docs.google.com/gview?url=${fileUrl}&embedded=true`;

  return (
    <div className="container my-4">
      <h2 className="mb-3">{report.title} (Report Viewer)</h2>

      <div className="mb-3">
        <Button variant="secondary" as={Link} to="/dashboard">
          Back to Dashboard
        </Button>
      </div>

      <div className="border rounded p-3 shadow-sm bg-light">
        {report.fileType === 'doc' || report.fileType === 'docx' ? (
          <iframe
            src={`https://docs.google.com/gview?url=${fileUrl}&embedded=true`}
            title="Word Document"
            width="100%"
            height="600px"
            style={{ border: '1px solid #ccc' }}
          ></iframe>
        ) : (
          <iframe
            src={embedUrl}
            title="Report"
            width="100%"
            height="600px"
            style={{ border: '1px solid #ccc' }}
          ></iframe>
        )}

        <a
          href={fileUrl}
          target="_blank"
          rel="noreferrer"
          download
          className="btn btn-primary mt-3"
        >
          Download Report
        </a>
      </div>
    </div>
  );
};

export default ReportView;
