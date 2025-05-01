import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

const Timeline = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/records')
      .then(res => res.json())
      .then(data => {
        setRecords(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching records:', err);
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

  const titleStyle = {
    fontSize: '2.5rem',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: '40px',
    color: '#212529'
  };

  const timelineStyle = {
    position: 'relative',
    paddingLeft: '50px',
    borderLeft: '4px solid #dee2e6'
  };

  const circleStyle = {
    position: 'absolute',
    left: '-16px',
    top: '15px',
    width: '30px',
    height: '30px',
    background: 'linear-gradient(135deg, #0d6efd, #6610f2)',
    borderRadius: '50%',
    border: '3px solid white',
    boxShadow: '0 0 0 5px #dee2e6',
    zIndex: 1
  };

  const cardStyle = {
    background: 'white',
    border: '1px solid #dee2e6',
    borderRadius: '12px',
    padding: '25px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden'
  };

  const cardHoverStyle = {
    transform: 'translateY(-3px)',
    boxShadow: '0 6px 18px rgba(0,0,0,0.15)'
  };

  const borderAccentColors = ['#0d6efd', '#20c997', '#fd7e14']; // Blue, Teal, Orange

  const timeStyle = {
    display: 'block',
    fontSize: '1rem',
    color: '#6c757d',
    marginBottom: '10px'
  };

  const cardTitleStyle = {
    fontSize: '1.6rem',
    fontWeight: '700',
    marginBottom: '10px',
    color: '#212529'
  };

  const descStyle = {
    fontSize: '1.05rem',
    color: '#495057',
    lineHeight: '1.6'
  };

  return (
    <div style={containerStyle}>
      <ul className="list-unstyled" style={timelineStyle}>
        {records.map((record, index) => {
          const accentColor = borderAccentColors[index % borderAccentColors.length];
          return (
            <li key={index} style={{ position: 'relative', marginBottom: '60px' }}>
              <span style={circleStyle}></span>
              <div
                style={{
                  ...cardStyle,
                  borderLeft: `6px solid ${accentColor}`
                }}
                onMouseEnter={e => Object.assign(e.currentTarget.style, { ...cardHoverStyle, borderLeft: `6px solid ${accentColor}` })}
                onMouseLeave={e => Object.assign(e.currentTarget.style, { ...cardStyle, borderLeft: `6px solid ${accentColor}` })}
              >
                <time style={timeStyle}>{new Date(record.date).toLocaleDateString()}</time>
                <h3 style={cardTitleStyle}>{record.title}</h3>
                <p style={descStyle}>{record.description}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Timeline;
