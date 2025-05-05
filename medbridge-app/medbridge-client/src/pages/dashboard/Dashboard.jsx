// src/pages/Patient/Dashboard.jsx
import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import SummarySection from './SummarySection';
import Timeline from './Timeline';
import PrescriptionList from './PrescriptionList';
import AppointmentHistory from './AppointmentHistory';
import PatientReports from './PatientReports';
import PendingApprovals from './PendingApprovals';
import './Dashboard.css';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('summary');

  const renderSection = () => {
    switch (activeSection) {
      case 'summary': return <SummarySection />;
      case 'timeline': return <Timeline />;
      case 'prescriptions': return <PrescriptionList />;
      case 'appointments': return <AppointmentHistory />;
      case 'reports': return <PatientReports />;
      case 'approveRequests': return <PendingApprovals />; // Replace '12345' with real patientId
      default: return <SummarySection />;
    }
  };

  return (
    <>
      <Navbar />
      <div className="dashboard-container d-flex">
        <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        <div className="main-dashboard-content">{renderSection()}</div>
      </div>
    </>
  );
};

export default Dashboard;
