// components/PatientReports.jsx
import React, { useEffect, useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';

const PatientReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/reports')
      .then(res => res.json())
      .then(data => {
        setReports(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching reports:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Patient Reports</h2>
      <div className="row">
        {reports.map((report, index) => (
          <div className="col-md-6 mb-4" key={index}>
            <div className="card shadow-sm h-100 border-primary">
              <div className="card-body">
                <h5 className="card-title text-primary">{report.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  {new Date(report.date).toLocaleDateString()} &middot; {report.doctor}
                </h6>
                <p className="card-text text-secondary">{report.description}</p>
                <Button variant="primary" href={`/report-view/${report.ipfsCid}`}>
                  View Report
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientReports;
