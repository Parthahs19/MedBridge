import React from 'react';
import './Navbar.css';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = ({ title }) => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2>{title}</h2>
      </div>
      <div className="navbar-right">
        <FaUserCircle size={28} className="profile-icon" />
        <div className="profile-dropdown">
          <a href="#">Profile</a>
          <a href="#">Settings</a>
          <a href="#">Logout</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
