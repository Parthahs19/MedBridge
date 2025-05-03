import React, { useEffect, useState } from 'react';
import { FaCalendarAlt, FaPrescriptionBottleAlt, FaHeartbeat, FaUserMd } from 'react-icons/fa';
import axios from 'axios';

const SummarySection = () => {
  const userId = localStorage.getItem('userId');
  const [patient, setPatient] = useState({ name: 'John Doe', age: 32, id: 'P-2034', doctor: 'Dr. Sarah Lewis' });
  const [patientData, setPatientData] = useState(null);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const res = await axios.get(`/api/patient/${userId}`);
        setPatientData(res.data);
      } catch (err) {
        console.error('Error fetching patient data:', err);
      }
    };
    fetchPatientData();
  }, [userId]);

  return (
    <>
      <header className="dashboard-header mb-4 p-4 rounded shadow">
        <h2>Hello, {patient.name}</h2>
        <p>Patient ID: <strong>{patient.id}</strong> | Age: <strong>{patient.age}</strong></p>
      </header>

      <div className="summary-grid">
        <div className="summary-card bg-cyan"><FaCalendarAlt size={30} /><h5>Upcoming Appointment</h5><p>Apr 30, 10:00 AM</p></div>
        <div className="summary-card bg-green"><FaPrescriptionBottleAlt size={30} /><h5>Active Prescriptions</h5><p>3</p></div>
        <div className="summary-card bg-yellow"><FaHeartbeat size={30} /><h5>Last Visit</h5><p>Apr 22, 2025</p></div>
        <div className="summary-card bg-purple"><FaUserMd size={30} /><h5>Doctor Assigned</h5><p>{patient.doctor}</p></div>
      </div>

      <div className="vitals-overview">
        <h4>📈 Latest Vitals Overview</h4>
        <div className="vitals-grid">
          <div className="vital-box"><h6>Heart Rate</h6><p>{patientData?.vitals?.heartRate || 'N/A'}</p></div>
          <div className="vital-box"><h6>Blood Pressure</h6><p>{patientData?.vitals?.bloodPressure || '120/80 mmHg'}</p></div>
          <div className="vital-box"><h6>Temperature</h6><p>{patientData?.vitals?.temperature || '98.6°F'}</p></div>
          <div className="vital-box"><h6>Oxygen Level</h6><p>{patientData?.vitals?.oxygenLevel || '98%'}</p></div>
        </div>
        <div className="health-tip">💡 <strong>Health Tip:</strong> Don’t forget to take your blood pressure medicine by 9 AM!</div>
      </div>
    </>
  );
};

export default SummarySection;
