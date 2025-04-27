import React, { useState } from 'react';
import Navbar from '../../components/common/Navbar';
import Sidebar from '../../components/common/Sidebar';
import SummaryCards from '../../components/common/SummaryCards';
import './AdminDashboard.css';
import { FaUserShield, FaDatabase, FaPlusCircle, FaUpload } from 'react-icons/fa';
import AddEditDeletePopup from './AddEditDeletePopup';
import IPFSUploader from '../../components/IPFSUploader';
import UploadedFilesList from '../../components/UploadedFilesList';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('summary');
  const [showPopup, setShowPopup] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const menuItems = [
    { key: 'summary', label: 'Summary', icon: <FaUserShield /> },
    { key: 'manageRecords', label: 'Manage Records', icon: <FaDatabase /> },
    { key: 'addEditDelete', label: 'Add/Edit/Delete', icon: <FaPlusCircle /> },
    { key: 'uploadIPFS', label: 'Upload Files (IPFS)', icon: <FaUpload /> }
  ];

  const summaryCards = [
    { title: 'Total Records', value: '320', icon: <FaDatabase size={40} />, bg: 'bg-primary' },
    { title: 'Doctors Managed', value: '25', icon: <FaUserShield size={40} />, bg: 'bg-success' },
    { title: 'Pending Requests', value: '12', icon: <FaPlusCircle size={40} />, bg: 'bg-warning' },
  ];

  const handleUploadSuccess = (cid) => {
    setUploadedFiles([...uploadedFiles, cid]);
  };

  return (
    <div className="admin-dashboard">
      <Navbar title="Admin Dashboard" />
      <div className="admin-main">
        <Sidebar menuItems={menuItems} onSelect={setActiveSection} />

        <div className="admin-content">
          {activeSection === 'summary' && (
            <>
              <h3>Welcome, Admin 🛡️</h3>
              <p>Monitor, control, and manage the system seamlessly from your dashboard.</p>
              <SummaryCards cards={summaryCards} />
            </>
          )}

          {activeSection === 'manageRecords' && (
            <>
              <h3>Manage Existing Records</h3>
              <div className="records-list">
                <div className="record-item">John Doe - Deleted Record</div>
                <div className="record-item">Jane Smith - Updated Record</div>
                <div className="record-item">Mike Johnson - Approved Record</div>
              </div>
            </>
          )}

          {activeSection === 'addEditDelete' && (
            <>
              <h3>Add / Edit / Delete Record</h3>
              <button className="popup-button" onClick={() => setShowPopup(true)}>Manage Records</button>
            </>
          )}

          {activeSection === 'uploadIPFS' && (
            <>
              <h3>Upload Files to IPFS</h3>
              <IPFSUploader onUploadSuccess={handleUploadSuccess} />
              <UploadedFilesList files={uploadedFiles} />
            </>
          )}
        </div>
      </div>

      {showPopup && <AddEditDeletePopup onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default AdminDashboard;
