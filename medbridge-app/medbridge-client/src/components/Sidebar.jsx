// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ role }) => {
  return (
    <div className="sidebar">
      <h2>Dashboard</h2>
      <ul>
        {role === 'Admin' && (
          <>
            <li>
              <Link to="/admin/patients">View Patients</Link>
            </li>
            <li>
              <Link to="/admin/doctors">View Doctors</Link>
            </li>
            <li>
              <Link to="/admin/assign-role">Assign Roles</Link>
            </li>
          </>
        )}
        {role === 'Doctor' && (
          <>
            <li>
              <Link to="/doctor/patients">View Patients</Link>
            </li>
            <li>
              <Link to="/doctor/add-record">Add Record</Link>
            </li>
          </>
        )}
        <li>
          <Link to="/view">View Records</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
