// src/pages/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js';
import './AdminDashboard.css';

ChartJS.register(
  // Import necessary Chart.js components
  require('chart.js').CategoryScale,
  require('chart.js').LinearScale,
  require('chart.js').BarElement,
  require('chart.js').Tooltip,
  require('chart.js').Legend
);

const AdminDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    // Fetch patients, doctors, and records data
    const fetchData = async () => {
      try {
        const patientRes = await axios.get('http://localhost:5000/api/users/patients');
        const doctorRes = await axios.get('http://localhost:5000/api/users/doctors');
        const recordRes = await axios.get('http://localhost:5000/api/records');
        setPatients(patientRes.data);
        setDoctors(doctorRes.data);
        setRecords(recordRes.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  // Chart data for patients and doctors
  const chartData = {
    labels: ['Doctors', 'Patients', 'Records'],
    datasets: [
      {
        label: 'Total',
        data: [doctors.length, patients.length, records.length],
        backgroundColor: ['#003366', '#006699', '#0099cc'],
        borderColor: '#fff',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="admin-dashboard">
      <Sidebar role="Admin" />
      <div className="dashboard-content">
        <h2>Admin Dashboard</h2>

        <div className="stats">
          <h3>Statistics</h3>
          <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>

        <h3>Patients</h3>
        <ul>
          {patients.map((patient) => (
            <li key={patient._id}>{patient.name}</li>
          ))}
        </ul>

        <h3>Doctors</h3>
        <ul>
          {doctors.map((doctor) => (
            <li key={doctor._id}>{doctor.name}</li>
          ))}
        </ul>

        <h3>Records</h3>
        <ul>
          {records.map((record) => (
            <li key={record._id}>{record.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
