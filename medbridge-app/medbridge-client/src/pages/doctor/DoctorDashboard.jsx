import React, { useState, useEffect } from 'react';
import Navbar from '../../components/common/Navbar';
import Sidebar from '../../components/common/Sidebar';
import SummaryCards from '../../components/common/SummaryCards';
import RecordsTable from './RecordsTable';
import AddEditRecordPopup from './AddEditRecordPopup';
import { fetchRecords, createRecord, updateRecord } from '../../utils/Record';
import './DoctorDashboard.css';
import { FaUserMd, FaFileMedical, FaNotesMedical } from 'react-icons/fa';

const DoctorDashboard = () => {
  const [activeSection, setActiveSection] = useState('summary');
  const [records, setRecords] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);

  const menuItems = [
    { key: 'summary', label: 'Summary', icon: <FaUserMd /> },
    { key: 'records', label: 'Patient Records', icon: <FaFileMedical /> },
    { key: 'addEdit', label: 'Add/Edit Record', icon: <FaNotesMedical /> }
  ];

  const summaryCards = [
    { title: 'Patients Treated', value: records.length, icon: <FaUserMd size={40} />, bg: 'bg-info' },
    { title: 'Records Updated', value: records.length, icon: <FaFileMedical size={40} />, bg: 'bg-success' },
    { title: 'Pending Reviews', value: '10', icon: <FaNotesMedical size={40} />, bg: 'bg-warning' },
  ];

  const loadRecords = async () => {
    const data = await fetchRecords();
    setRecords(data);
  };

  useEffect(() => {
    loadRecords();
  }, []);

  const handleAddClick = () => {
    setEditData(null);
    setShowForm(true);
  };

  const handleEditClick = (record) => {
    setEditData(record);
    setShowForm(true);
  };

  const handleAddEditSubmit = async (formData) => {
    if (editData && editData.recordId) {
      // Use recordId instead of _id
      await updateRecord(editData.recordId, formData);
    } else {
      await createRecord(formData);
    }
    setShowForm(false);
    setEditData(null);
    loadRecords();
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditData(null);
  };

  return (
    <div className="doctor-dashboard">
      <Navbar title="Doctor Dashboard" />
      <div className="doctor-main">
        <Sidebar menuItems={menuItems} onSelect={setActiveSection} />

        <div className="doctor-content">
          {activeSection === 'summary' && (
            <>
              <h3>Welcome, Doctor 👨‍⚕️</h3>
              <p>Monitor and manage your patient records efficiently.</p>
              <SummaryCards cards={summaryCards} />
            </>
          )}

          {activeSection === 'records' && (
            <>
              <h3>Patient Records</h3>
              <RecordsTable records={records} onEdit={handleEditClick} />
            </>
          )}

          {activeSection === 'addEdit' && (
            <>
              <h3>Add or Edit Record</h3>
              <button className="popup-button" onClick={handleAddClick}>
                Add New Record
              </button>
            </>
          )}
        </div>
      </div>

      {showForm && (
        <AddEditRecordPopup
          initialData={editData}
          onSubmit={handleAddEditSubmit}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
};

export default DoctorDashboard;
