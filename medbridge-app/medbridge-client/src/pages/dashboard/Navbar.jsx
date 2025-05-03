import React from 'react';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="dashboard-navbar">
      <h1 className="logo">🏥 MedBridge</h1>
      <div className="nav-links">
        <button className="nav-button" onClick={() => navigate('/profile')}>
          <FaUserCircle /> Profile
        </button>
        <button className="nav-button logout" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
