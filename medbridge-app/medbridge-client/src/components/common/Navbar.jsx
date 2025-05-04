import React from 'react';
import './Navbar.css';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ title }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2>{title}</h2>
      </div>
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
