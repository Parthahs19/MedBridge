import React, { useState } from 'react';
import './Dashboard.css';
import { motion } from 'framer-motion';
import { FaFileMedical, FaPrescriptionBottleAlt, FaCalendarAlt, FaChartLine, FaUserCircle, FaCog, FaSignOutAlt } from 'react-icons/fa';
import Timeline from './Timeline';
import PrescriptionList from './PrescriptionList';
import AppointmentHistory from './AppointmentHistory';

const Dashboard = () => {
  const [patient, setPatient] = useState({ name: "John Doe", age: 32, id: "P-2034" });
  const [activeSection, setActiveSection] = useState("summary");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = () => {
    // Logout logic here
    console.log("Logging out...");
  };

  return (
    <>
      {/* Dashboard Custom Navbar */}
      <nav className="dashboard-navbar">
        <h1 className="logo">🏥 MedBridge</h1>
        <div className="profile-menu">
          <FaUserCircle size={28} onClick={toggleDropdown} className="profile-icon" />
          {dropdownOpen && (
            <div className="dropdown-menu">
              <p><FaUserCircle /> Profile</p>
              <p><FaCog /> Settings</p>
              <p onClick={handleLogout}><FaSignOutAlt /> Logout</p>
            </div>
          )}
        </div>
      </nav>

      <div className="dashboard-container d-flex">
        {/* Sidebar */}
        <aside className="sidebar">
  <ul>
    <li className={activeSection === "summary" ? "active" : ""} onClick={() => setActiveSection("summary")}>
      <FaChartLine /> <span>Dashboard</span>
    </li>
    <li className={activeSection === "timeline" ? "active" : ""} onClick={() => setActiveSection("timeline")}>
      <FaFileMedical /> <span>Timeline</span>
    </li>
    <li className={activeSection === "prescriptions" ? "active" : ""} onClick={() => setActiveSection("prescriptions")}>
      <FaPrescriptionBottleAlt /> <span>Prescriptions</span>
    </li>
    <li className={activeSection === "appointments" ? "active" : ""} onClick={() => setActiveSection("appointments")}>
      <FaCalendarAlt /> <span>Appointments</span>
    </li>
  </ul>
</aside>

        {/* Main Content */}
        <div className="main-dashboard-content">
          <header className="dashboard-header mb-4 p-4 rounded shadow">
            <h2>Hello, {patient.name}</h2>
            <p>Patient ID: <strong>{patient.id}</strong> | Age: <strong>{patient.age}</strong></p>
          </header>

          {activeSection === "summary" && (
            <motion.section
              className="dashboard-widgets row g-4"
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            >
              {/* Primary Cards */}
              <div className="col-md-5">
                <div className="widget-card bg-gradient-info text-white p-4 rounded shadow">
                  <FaFileMedical size={32} />
                  <h5>Total Records</h5>
                  <p className="fs-4 fw-semibold">14</p>
                </div>
              </div>
              <div className="col-md-5">
                <div className="widget-card bg-gradient-success text-white p-4 rounded shadow">
                  <FaPrescriptionBottleAlt size={32} />
                  <h5>Prescriptions</h5>
                  <p className="fs-4 fw-semibold">28</p>
                </div>
              </div>
              <div className="col-md-5">
                <div className="widget-card bg-gradient-warning text-white p-4 rounded shadow">
                  <FaCalendarAlt size={32} />
                  <h5>Appointments</h5>
                  <p className="fs-4 fw-semibold">7 Past</p>
                </div>
              </div>

              {/* Extra Summary Section */}
              <div className="extra-summary mt-5 p-4 rounded shadow bg-white">
                <h4 className="mb-4">📈 Latest Vitals Overview</h4>
                <div className="vitals-grid">
                  <div className="vital-box">
                    <h6>Heart Rate</h6>
                    <p>78 bpm</p>
                  </div>
                  <div className="vital-box">
                    <h6>Blood Pressure</h6>
                    <p>120/80 mmHg</p>
                  </div>
                  <div className="vital-box">
                    <h6>Temperature</h6>
                    <p>98.6°F</p>
                  </div>
                  <div className="vital-box">
                    <h6>Oxygen Level</h6>
                    <p>98%</p>
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {activeSection === "timeline" && (
            <section className="dashboard-section mt-4">
              <h4>📜 Medical Record Timeline</h4>
              <Timeline />
            </section>
          )}

          {activeSection === "prescriptions" && (
            <section className="dashboard-section mt-4">
              <h4>💊 Recent Prescriptions</h4>
              <PrescriptionList />
            </section>
          )}

          {activeSection === "appointments" && (
            <section className="dashboard-section mt-4">
              <h4>📅 Appointment History</h4>
              <AppointmentHistory />
            </section>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
