// src/pages/Doctor/DoctorDashboard.jsx
import React, { useState, useEffect } from 'react';
import Navbar from '../../components/common/Navbar';
import Sidebar from '../../components/common/Sidebar';
import SummaryCards from '../../components/common/SummaryCards';
import RecordsTable from './RecordsTable';
import AddEditRecordPopup from './AddEditRecordPopup';
import DiagnosisChart from './DiagnosisChart';
import AppointmentsTable from './AppointmentsTable';
import AddEditAppointmentPopup from './AddEditAppointmentPopup';
import UploadReport from './UploadReport';
import ViewReports from './ViewReports';
import Wallet from './Wallet';
import { fetchRecords, createRecord, updateRecord } from '../../utils/Record';
import { fetchAppointments, createAppointment, updateAppointment } from '../../utils/Appointment';
import './DoctorDashboard.css';
import { FaUserMd, FaFileMedical, FaNotesMedical, FaCalendarCheck,FaExchangeAlt,FaWallet  } from 'react-icons/fa';
import RaiseRequest from './RaiseRequest';
import axios from 'axios';

const DoctorDashboard = () => {
  const [activeSection, setActiveSection] = useState('summary');

  const [records, setRecords] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);

  const [appointments, setAppointments] = useState([]);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [editAppointmentData, setEditAppointmentData] = useState(null);

  const [doctorsList, setDoctorsList] = useState([]);
  const [patientsList, setPatientsList] = useState([]);
  const [myReports, setMyReports] = useState([]);

  const menuItems = [
    { key: 'summary', label: 'Summary', icon: <FaUserMd /> },
    { key: 'records', label: 'Patient Records', icon: <FaFileMedical /> },
    { key: 'addEdit', label: 'Add/Edit Record', icon: <FaNotesMedical /> },
    { key: 'appointments', label: 'Appointments', icon: <FaCalendarCheck /> },
    { key: 'uploadReport', label: 'Upload Report', icon: <FaFileMedical /> },
    { key: 'viewReports', label: 'View Reports', icon: <FaNotesMedical /> },
    { key: 'raiseRequest', label: 'Raise Transfer Request', icon: <FaExchangeAlt /> },
    { key: 'myWallet', label: 'My Wallet', icon: <FaWallet /> },  
  ];

  const summaryCards = [
    { title: 'Patients Treated', value: records.length, icon: <FaUserMd size={40} />, bg: 'bg-info' },
    { title: 'Records Updated', value: records.length, icon: <FaFileMedical size={40} />, bg: 'bg-success' },
    { title: 'Pending Reviews', value: '10', icon: <FaNotesMedical size={40} />, bg: 'bg-warning' },
    { title: 'Unique Diagnoses', value: [...new Set(records.map(r => r.diagnosis))].length, icon: <FaNotesMedical size={40} />, bg: 'bg-primary' },
  ];

  const loadRecords = async () => {
    const data = await fetchRecords();
    setRecords(data);
  };

  const loadAppointments = async () => {
    const data = await fetchAppointments();
    setAppointments(data);
  };

  const loadDoctorsPatients = async () => {
    try {
      const [doctorsRes, patientsRes] = await Promise.all([
        fetch('/api/lookup/doctors'),
        fetch('/api/lookup/patients')
      ]);
      const doctorsData = await doctorsRes.json();
      const patientsData = await patientsRes.json();
      setDoctorsList(doctorsData);
      setPatientsList(patientsData);
    } catch (err) {
      console.error('Error fetching doctors or patients:', err);
    }
  };

  useEffect(() => {
    loadRecords();
    loadAppointments();
    loadDoctorsPatients();
    const fetchReports = async () => {
      const res = await axios.get('/api/reports');
      setMyReports(res.data);
    };
    fetchReports();
  }, []);

  const handleAddEditSubmit = async (formData) => {
    if (editData) {
      await updateRecord(editData._id, formData);
    } else {
      await createRecord(formData);
    }
    setShowForm(false);
    setEditData(null);
    loadRecords();
  };

  const handleEditClick = (record) => {
    setEditData(record);
    setShowForm(true);
  };

  const handleAppointmentSubmit = async (formData) => {
    if (editAppointmentData) {
      await updateAppointment(editAppointmentData._id, formData);
    } else {
      await createAppointment(formData);
    }
    setShowAppointmentForm(false);
    setEditAppointmentData(null);
    loadAppointments();
  };

  const handleAppointmentEditClick = (appointment) => {
    setEditAppointmentData(appointment);
    setShowAppointmentForm(true);
  };

  const getMostCommonDiagnosis = (records) => {
    const counts = {};
    records.forEach(r => {
      counts[r.diagnosis] = (counts[r.diagnosis] || 0) + 1;
    });
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    return sorted[0] ? sorted[0][0] : 'N/A';
  };
  console.log(myReports);
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

              <div className="quick-stats">
                <h4>Quick Stats</h4>
                <ul>
                  <li>Total Records: <strong>{records.length}</strong></li>
                  <li>Unique Patients: <strong>{[...new Set(records.map(r => r.patientName))].length}</strong></li>
                  <li>Most Common Diagnosis: <strong>{getMostCommonDiagnosis(records)}</strong></li>
                </ul>
              </div>

              <div className="recent-activity">
                <h4>Recent Patient Records</h4>
                <ul>
                  {records.slice(0, 3).map((rec) => (
                    <li key={rec._id}>
                      <strong>{rec.patientName}</strong> — {rec.diagnosis} (by Dr. {rec.doctorName}) on {new Date(rec.date).toLocaleDateString()}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="diagnosis-chart-section">
                <h4>Diagnosis Breakdown</h4>
                <DiagnosisChart records={records} />
              </div>
            </>
          )}
         
          {activeSection === 'records' && (
            <>
              <h3>Patient Records</h3>
              <RecordsTable
                records={records}
                onEdit={handleEditClick}
                patients={patientsList}
                doctors={doctorsList}
              />
            </>
          )}

          {activeSection === 'addEdit' && (
            <>
              <h3>Add or Edit Patient Record</h3>
              <p className="section-description">
                Manage patient records by adding new details or updating existing ones. Keeping patient records accurate ensures better treatment tracking.
              </p>

              <button className="popup-button" onClick={() => { setEditData(null); setShowForm(true); }}>
                ➕ Add New Record
              </button>

              <div className="recent-records-preview">
                <h4>Recent Records</h4>
                {records.length === 0 ? (
                  <p className="no-records-text">No records available yet. Start by adding a new record above.</p>
                ) : (
                  <table className="records-preview-table">
                    <thead>
                      <tr>
                        <th>Patient</th>
                        <th>Diagnosis</th>
                        <th>Treatment</th>
                        <th>Date</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {records.slice(0, 5).map((record) => (
                        <tr key={record._id}>
                          <td>{record.patientName}</td>
                          <td>{record.diagnosis}</td>
                          <td>{record.treatment}</td>
                          <td>{new Date(record.date).toLocaleDateString()}</td>
                          <td>
                            <button className="edit-btn" onClick={() => handleEditClick(record)}>
                              ✏️ Edit
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </>
          )}

          {activeSection === 'appointments' && (
            <>
              <h3>Appointments</h3>
              <AppointmentsTable
                appointments={appointments}
                doctors={doctorsList}
                patients={patientsList}
                onEdit={handleAppointmentEditClick}
              />
            </>
          )}

          {activeSection === 'uploadReport' && (
            <>
              <h3>Upload Patient Report</h3>
              <UploadReport patientsList={patientsList} />
            </>
          )}

          {activeSection === 'viewReports' && (
            <>
              <h3>View Patient Reports</h3>
              <ViewReports patientsList={patientsList} />
            </>
          )}

{activeSection === 'raiseRequest' && (
  <>
    <h3>Raise Transfer Request</h3>
    <RaiseRequest reportList={myReports} />
  </>
)}

{activeSection === 'myWallet' && (
  <>
    <h3>My Blockchain Wallet</h3>
    <Wallet />
  </>
)}

        </div>
      </div>

      {showForm && (
        <AddEditRecordPopup
          initialData={editData}
          onSubmit={handleAddEditSubmit}
          onClose={() => { setShowForm(false); setEditData(null); }}
        />
      )}

      {showAppointmentForm && (
        <AddEditAppointmentPopup
          initialData={editAppointmentData}
          onSubmit={handleAppointmentSubmit}
          onClose={() => { setShowAppointmentForm(false); setEditAppointmentData(null); }}
        />
      )}
    </div>
  );
};

export default DoctorDashboard;
