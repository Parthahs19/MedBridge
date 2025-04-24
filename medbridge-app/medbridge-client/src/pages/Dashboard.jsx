import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { motion } from 'framer-motion';
import { FaFileMedical, FaPrescriptionBottleAlt, FaCalendarAlt, FaChartLine } from 'react-icons/fa';
import Timeline from './Timeline';
import PrescriptionList from './PrescriptionList';
import AppointmentHistory from './AppointmentHistory';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';

const Dashboard = () => {
  const [patient, setPatient] = useState({ name: "John Doe", age: 32, id: "P-2034" });
  const [activeSection, setActiveSection] = useState("summary");

  return (
    <>
      <Navbar />
      <div className="dashboard-container d-flex">
        {/* Sidebar */}
        <aside className="sidebar">
          <ul>
            <li onClick={() => setActiveSection("summary")}><FaChartLine /> Dashboard Summary</li>
            <li onClick={() => setActiveSection("timeline")}><FaFileMedical /> Medical Timeline</li>
            <li onClick={() => setActiveSection("prescriptions")}><FaPrescriptionBottleAlt /> Prescriptions</li>
            <li onClick={() => setActiveSection("appointments")}><FaCalendarAlt /> Appointments</li>
          </ul>
        </aside>

        {/* Main Content */}
        <div className="main-dashboard-content">
          <header className="dashboard-header mb-4 p-4 bg-gradient-blue text-white rounded shadow">
            <h2 className="fw-bold mb-2">👋 Hello, {patient.name}</h2>
            <p className="mb-0">Patient ID: <strong>{patient.id}</strong> | Age: <strong>{patient.age}</strong></p>
          </header>

          {activeSection === "summary" && (
            <motion.section 
              className="dashboard-widgets row g-4"
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            >
              <div className="col-md-4">
                <div className="widget-card card-hover bg-gradient-info text-white p-4 rounded shadow">
                  <FaFileMedical size={28} />
                  <h5 className="mt-2">Total Records</h5>
                  <p className="fs-4 fw-semibold">14</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="widget-card card-hover bg-gradient-success text-white p-4 rounded shadow">
                  <FaPrescriptionBottleAlt size={28} />
                  <h5 className="mt-2">Prescriptions</h5>
                  <p className="fs-4 fw-semibold">28</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="widget-card card-hover bg-gradient-warning text-white p-4 rounded shadow">
                  <FaCalendarAlt size={28} />
                  <h5 className="mt-2">Appointments</h5>
                  <p className="fs-4 fw-semibold">7 Past</p>
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
      <Footer />
    </>
  );
};

export default Dashboard;
