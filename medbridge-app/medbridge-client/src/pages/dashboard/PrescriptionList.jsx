// PrescriptionList.js
import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

const PrescriptionList = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      const token = localStorage.getItem('token');
      const patientId = localStorage.getItem('patientId');

      if (!token || !patientId) {
        console.error('Missing token or patientId in localStorage');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/api/prescriptions/patient/${patientId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch prescriptions');
        }

        const data = await response.json();
        setPrescriptions(data);
      } catch (error) {
        console.error('Error fetching prescriptions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrescriptions();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
        <Loader2 className="animate-spin" style={{ width: '40px', height: '40px', color: '#0d6efd' }} />
      </div>
    );
  }

  const containerStyle = {
    maxWidth: '900px',
    margin: '50px auto',
    padding: '20px'
  };

  const cardStyle = {
    background: 'white',
    border: '1px solid #dee2e6',
    borderRadius: '12px',
    padding: '25px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    cursor: 'pointer',
    marginBottom: '25px'
  };

  const cardHoverStyle = {
    transform: 'translateY(-3px)',
    boxShadow: '0 6px 18px rgba(0,0,0,0.15)'
  };

  const headingStyle = {
    fontSize: '2.2rem',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: '40px',
    color: '#212529'
  };

  const dateStyle = {
    fontSize: '1rem',
    color: '#6c757d',
    marginBottom: '8px'
  };

  const doctorStyle = {
    fontSize: '1.4rem',
    fontWeight: '600',
    marginBottom: '10px',
    color: '#0d6efd'
  };

  const summaryStyle = {
    fontSize: '1.1rem',
    color: '#495057'
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>My Prescriptions</h1>
      {prescriptions.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#6c757d' }}>No prescriptions found.</p>
      ) : (
        prescriptions.map((item) => (
          <div
            key={item._id}
            style={cardStyle}
            onMouseEnter={e => Object.assign(e.currentTarget.style, cardHoverStyle)}
            onMouseLeave={e => Object.assign(e.currentTarget.style, cardStyle)}
          >
            <div style={dateStyle}>{new Date(item.date).toLocaleDateString()}</div>
            <div style={doctorStyle}>{item.doctor}</div>
            <div style={summaryStyle}>{item.summary}</div>
          </div>
        ))
      )}
    </div>
  );
};

export default PrescriptionList;

