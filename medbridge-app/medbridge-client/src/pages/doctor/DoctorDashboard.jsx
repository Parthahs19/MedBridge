import React, { useState } from 'react';
import Navbar from '../../components/common/Navbar';
import Sidebar from '../../components/common/Sidebar';
import SummaryCards from '../../components/common/SummaryCards';
import './DoctorDashboard.css';
import { FaUserMd, FaFileMedical, FaNotesMedical } from 'react-icons/fa';
import AddEditRecordPopup from './AddEditRecordPopup';

const DoctorDashboard = () => {
  const [activeSection, setActiveSection] = useState('summary');
  const [showPopup, setShowPopup] = useState(false);

  const menuItems = [
    { key: 'summary', label: 'Summary', icon: <FaUserMd /> },
    { key: 'records', label: 'Patient Records', icon: <FaFileMedical /> },
    { key: 'addEdit', label: 'Add/Edit Record', icon: <FaNotesMedical /> }
  ];

  const summaryCards = [
    { title: 'Patients Treated', value: '120', icon: <FaUserMd size={40} />, bg: 'bg-info' },
    { title: 'Records Updated', value: '85', icon: <FaFileMedical size={40} />, bg: 'bg-success' },
    { title: 'Pending Reviews', value: '10', icon: <FaNotesMedical size={40} />, bg: 'bg-warning' },
  ];

  return (
    <div className="doctor-dashboard">
      <Navbar title="Doctor Dashboard" />
      <div className="doctor-main">
        <Sidebar menuItems={menuItems} onSelect={setActiveSection} />

        <div className="doctor-content">
          {activeSection === 'summary' && (
            <>
              <h3>Welcome, Doctor 👨‍⚕️</h3>
              <p>Manage your patients and update medical records easily from your dashboard.</p>
              <SummaryCards cards={summaryCards} />
            </>
          )}

          {activeSection === 'records' && (
            <>
              <h3>Patient Records</h3>
              <div className="records-list">
                {/* Example static list */}
                <div className="record-item">John Doe - Diabetes Management</div>
                <div className="record-item">Jane Smith - Cardiology Checkup</div>
                <div className="record-item">Mike Johnson - Orthopedic Treatment</div>
              </div>
            </>
          )}

          {activeSection === 'addEdit' && (
            <>
              <h3>Add or Edit Record</h3>
              <button className="popup-button" onClick={() => setShowPopup(true)}>Add/Edit Record</button>
            </>
          )}
        </div>
      </div>

      {showPopup && <AddEditRecordPopup onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default DoctorDashboard;
