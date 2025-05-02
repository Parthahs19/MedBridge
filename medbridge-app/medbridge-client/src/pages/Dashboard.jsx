// Dashboard.jsx
import React, { useState, useEffect, useRef } from 'react';
import {
  FaFileMedical,
  FaPrescriptionBottleAlt,
  FaCalendarAlt,
  FaChartLine,
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
  FaUserMd,
  FaHeartbeat,
  FaFolderOpen,
} from 'react-icons/fa';
import Timeline from './Timeline';
import PrescriptionList from './PrescriptionList';
import AppointmentHistory from './AppointmentHistory';
import PatientReports from './PatientReports';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const userId = localStorage.getItem("userId");
  const [patient, setPatient] = useState({ name: "John Doe", age: 32, id: "P-2034", doctor: "Dr. Sarah Lewis" });
  const [patientData, setPatientData] = useState(null);
  const [activeSection, setActiveSection] = useState("summary");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const dropdownRef = useRef(null);

  // Handle dropdown toggle and outside click close
  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await axios.get(`/api/patient/${userId}`);
        console.log("Patient API Response:", response.data);
        setPatientData(response.data);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };
    fetchPatientData();
  }, [userId]);

  return (
    <>
      {/* Navbar */}
      <nav className="dashboard-navbar">
        <h1 className="logo">🏥 MedBridge</h1>

        <div className={`profile-menu ${dropdownOpen ? 'open' : ''}`}>
          <FaUserCircle
            size={28}
            className="profile-icon"
            onClick={toggleDropdown}
          />
          {dropdownOpen && (
            <div className="dropdown-menu">
              <p onClick={() => navigate('/profile')}>
                <FaUserCircle /> Profile
              </p>
              <p onClick={() => navigate('/settings')}>
                <FaCog /> Settings
              </p>
              <p onClick={handleLogout}>
                <FaSignOutAlt /> Logout
              </p>
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
            <li className={activeSection === "reports" ? "active" : ""} onClick={() => setActiveSection("reports")}>
              <FaFolderOpen /> <span>Patient Reports</span>
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
            <section className="dashboard-summary">
              <div className="summary-grid">
                <div className="summary-card bg-cyan">
                  <FaCalendarAlt size={30} />
                  <h5>Upcoming Appointment</h5>
                  <p>Apr 30, 10:00 AM</p>
                </div>

                <div className="summary-card bg-green">
                  <FaPrescriptionBottleAlt size={30} />
                  <h5>Active Prescriptions</h5>
                  <p>3</p>
                </div>

                <div className="summary-card bg-yellow">
                  <FaHeartbeat size={30} />
                  <h5>Last Visit</h5>
                  <p>Apr 22, 2025</p>
                </div>

                <div className="summary-card bg-purple">
                  <FaUserMd size={30} />
                  <h5>Doctor Assigned</h5>
                  <p>{patient?.doctor}</p>
                </div>
              </div>

              <div className="vitals-overview">
                <h4>📈 Latest Vitals Overview</h4>
                <div className="vitals-grid">
                  <div className="vital-box"><h6>Heart Rate</h6><p>{patientData?.vitals?.heartRate || 'N/A'}</p></div>
                  <div className="vital-box"><h6>Blood Pressure</h6><p>{patientData?.vitals?.bloodPressure || '120/80 mmHg'}</p></div>
                  <div className="vital-box"><h6>Temperature</h6><p>{patientData?.vitals?.temperature || '98.6°F'}</p></div>
                  <div className="vital-box"><h6>Oxygen Level</h6><p>{patientData?.vitals?.oxygenLevel || '98%'}</p></div>
                </div>
                <div className="health-tip">
                  💡 <strong>Health Tip:</strong> Don’t forget to take your blood pressure medicine by 9 AM!
                </div>
              </div>
            </section>
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

          {activeSection === "reports" && (
            <section className="dashboard-section mt-4">
              <h4>📂 Patient Reports</h4>
              <PatientReports />
            </section>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
