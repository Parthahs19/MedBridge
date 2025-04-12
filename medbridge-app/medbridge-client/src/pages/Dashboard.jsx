import React, { useState } from 'react';
import './Dashboard.css';
import { FaUserMd, FaUserInjured, FaFileMedical, FaSignOutAlt } from 'react-icons/fa';
import { Link, Routes, Route } from 'react-router-dom';
import Records from './Records'; // You can create these components
import Patients from './Patients'; 
import Settings from './Settings'; 

const Dashboard = () => {
  const [user, setUser] = useState({ name: "Dr. Smith", role: "Doctor" });
  const [activeSection, setActiveSection] = useState("dashboard");

  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2 className="logo">MedBridge</h2>
        <ul className="sidebar-menu">
          <li 
            className={activeSection === "dashboard" ? "active" : ""}
            onClick={() => setActiveSection("dashboard")}
          >
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li 
            className={activeSection === "records" ? "active" : ""}
            onClick={() => setActiveSection("records")}
          >
            <Link to="/records">Records</Link>
          </li>
          <li 
            className={activeSection === "patients" ? "active" : ""}
            onClick={() => setActiveSection("patients")}
          >
            <Link to="/patients">Patients</Link>
          </li>
          <li 
            className={activeSection === "settings" ? "active" : ""}
            onClick={() => setActiveSection("settings")}
          >
            <Link to="/settings">Settings</Link>
          </li>
          <li onClick={logout}><FaSignOutAlt /> Logout</li>
        </ul>
      </aside>

      <main className="main-content">
        <header className="dashboard-header">
          <h3>Welcome, {user.name}</h3>
          <span className={`badge ${user.role.toLowerCase()}`}>{user.role}</span>
        </header>

        <section className="dashboard-widgets row">
          <div className="col-md-3 widget-card bg-primary text-white">
            <FaUserInjured /> <h5>Total Patients</h5> <p>124</p>
          </div>
          <div className="col-md-3 widget-card bg-success text-white">
            <FaUserMd /> <h5>Doctors</h5> <p>22</p>
          </div>
          <div className="col-md-3 widget-card bg-info text-white">
            <FaFileMedical /> <h5>Medical Records</h5> <p>560+</p>
          </div>
          <div className="col-md-3 widget-card bg-warning text-white">
            <h5>Appointments Today</h5> <p>17</p>
          </div>
        </section>

        <section className="dashboard-section mt-4">
          <Routes>
            <Route path="dashboard" element={<h4>Dashboard Overview</h4>} />
            <Route path="records" element={<Records />} />
            <Route path="patients" element={<Patients />} />
            <Route path="settings" element={<Settings />} />
          </Routes>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
