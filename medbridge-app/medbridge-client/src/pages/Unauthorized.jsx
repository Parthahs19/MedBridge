// src/pages/Unauthorized.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Unauthorized.css'; // we'll create a custom css too

const Unauthorized = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);

    return () => clearTimeout(timer); // Cleanup timer if component unmounts
  }, [navigate]);

  return (
    <div className="unauthorized-container">
      <div className="unauthorized-card">
        <h1>🚫 403 - Unauthorized</h1>
        <p>Oops! You don't have permission to access this page.</p>
        <p>Redirecting you to the <span className="highlight">Home</span> page in 5 seconds...</p>
      </div>
    </div>
  );
};

export default Unauthorized;
