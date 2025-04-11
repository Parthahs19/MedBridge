// src/pages/DoctorDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js';
import './DoctorDashboard.css';

ChartJS.register(
  require('chart.js').CategoryScale,
  require('chart.js').LinearScale,
  require('chart.js').BarElement,
  require('chart.js').Tooltip,
  require('chart.js').Legend
);

const DoctorDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    // Fetch patients and records data
    const fetchData = async () => {
      try {
        const patientRes = await axios.get('http://localhost:5000/api/users/patients');
        const recordRes = await axios.get('http://localhost:5000/api/records');
        setPatients(patientRes.data);
        setRecords(recordRes.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  // Chart data for patients and records
  const chartData = {
    labels: ['Patients', 'Records'],
    datasets: [
      {
        label: 'Total',
        data: [patients.length, records.length],
        backgroundColor: ['#003366', '#0099cc'],
        borderColor: '#fff',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="doctor-dashboard">
      <Sidebar role="Doctor" />
      <div className="dashboard-content">
        <h2>Doctor Dashboard</h2>

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

export default DoctorDashboard;
