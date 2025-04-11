// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from '../utils/axiosInstance'; // Import the axios instance with interceptors

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      history.push('/login'); // Redirect if no token
    } else {
      axios.get('/user/profile') // Fetch user profile from protected route
        .then(res => setUserData(res.data))
        .catch(() => history.push('/login')); // Redirect if token is invalid
    }
  }, [history]);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold">Dashboard</h2>
      <div className="mt-6">
        {userData ? (
          <div>
            <h3 className="text-xl">Welcome, {userData.name}</h3>
            <p>Email: {userData.email}</p>
            {/* Add more user-specific details here */}
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
