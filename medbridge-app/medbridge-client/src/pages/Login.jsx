// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';
import './Auth.css';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'patient',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(formData);
      const { token, role, patientId, doctorId, adminId } = res.data;
  
      // Store token + role + id based on role
      localStorage.setItem('token', token);
      localStorage.setItem('user', role);
      if (role === 'patient') {
        localStorage.setItem('id', patientId);
      } else if (role === 'doctor') {
        localStorage.setItem('id', doctorId);
      } else if (role === 'admin') {
        localStorage.setItem('id', adminId);
      }
  
      // Redirect based on role
      if (role === 'admin') {
        navigate('/admin');
      } else if (role === 'doctor') {
        navigate('/doctor');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed.');
    }
  };
  
  
  

  return (
    <>
      <Navbar />
      <div className="auth-container">
        <div className="auth-form">
          <h2>Login</h2>
          {error && <p className="auth-error">{error}</p>}
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            {/* Role Dropdown */}
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="auth-select"
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
              <option value="admin">Admin</option>
            </select>

            <button type="submit">Login</button>
          </form>

          <p>
            Don't have an account? <a href="/register">Register</a>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
