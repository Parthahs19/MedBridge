import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

const PrescriptionList = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/prescriptions')
      .then(res => res.json())
      .then(data => {
        setPrescriptions(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching prescriptions:', err);
        setLoading(false);
      });
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
      <h1>Prescription</h1>
      <br />
      {prescriptions.map((item, idx) => (
        <div
          key={idx}
          style={cardStyle}
          onMouseEnter={e => Object.assign(e.currentTarget.style, cardHoverStyle)}
          onMouseLeave={e => Object.assign(e.currentTarget.style, cardStyle)}
        >
          <div style={dateStyle}>{new Date(item.date).toLocaleDateString()}</div>
          <div style={doctorStyle}>{item.doctor}</div>
          <div style={summaryStyle}>{item.summary}</div>
        </div>
      ))}
    </div>
  );
};

export default PrescriptionList;
