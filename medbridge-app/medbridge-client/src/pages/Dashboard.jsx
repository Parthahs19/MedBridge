import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { FaFileMedical, FaPrescriptionBottleAlt, FaCalendarAlt } from 'react-icons/fa';
import Timeline from './Timeline';
import PrescriptionList from './PrescriptionList';
import AppointmentHistory from './AppoinmentHistory';

const Dashboard = () => {
  const [patient, setPatient] = useState({ name: "John Doe", age: 32, id: "P-2034" });

  useEffect(() => {
    // Fetch patient-specific data from backend
  }, []);

  return (
    <div className="patient-dashboard-container">
      <header className="dashboard-header">
        <h3>Welcome, {patient.name}</h3>
        <p>Patient ID: {patient.id} | Age: {patient.age}</p>
      </header>

      <section className="dashboard-widgets row">
        <div className="col-md-4 widget-card bg-info text-white">
          <FaFileMedical /> <h5>Total Records</h5> <p>14</p>
        </div>
        <div className="col-md-4 widget-card bg-success text-white">
          <FaPrescriptionBottleAlt /> <h5>Prescriptions</h5> <p>28</p>
        </div>
        <div className="col-md-4 widget-card bg-warning text-white">
          <FaCalendarAlt /> <h5>Appointments</h5> <p>7 Past</p>
        </div>
      </section>

      <section className="dashboard-section mt-4">
        <h4>📜 Medical Record Timeline</h4>
        <Timeline />

        <h4 className="mt-4">💊 Recent Prescriptions</h4>
        <PrescriptionList />

        <h4 className="mt-4">📅 Appointment History</h4>
        <AppointmentHistory />
      </section>
    </div>
  );
};

export default Dashboard;