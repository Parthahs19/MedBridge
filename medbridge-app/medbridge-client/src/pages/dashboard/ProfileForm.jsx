// components/ProfileForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileForm.css';
import axios from 'axios';

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dob: '',
    address: '',
    medicalHistory: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const API_URL = 'http://localhost:5000/api/profile';
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await axios.get(API_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data) {
          const profile = res.data;
          // Fix dob format if it exists
          const formattedProfile = {
            ...profile,
            dob: profile.dob ? profile.dob.split('T')[0] : '', // "yyyy-MM-dd"
          };
          setFormData(formattedProfile);
        }
      } catch (err) {
        console.error('No profile data found');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post(API_URL, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage('Profile updated successfully!');
    } catch (err) {
      setMessage('Error updating profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <>
      <div className="inline-navbar">
        <h1 className="logo">🏥 MedBridge</h1>
        <div className="nav-buttons">
          <button onClick={() => navigate('/dashboard')}>Dashboard</button>
          <button className="logout" onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <div className="profile-container">
        <h2>🩺 My Profile</h2>
        <p>Update your personal and medical information</p>

        <form className="profile-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input name="fullName" value={formData.fullName} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input name="email" type="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input name="phone" value={formData.phone} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Date of Birth</label>
            <input name="dob" type="date" value={formData.dob} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Address</label>
            <textarea name="address" rows="2" value={formData.address} onChange={handleChange}></textarea>
          </div>

          <div className="form-group">
            <label>Medical History</label>
            <textarea name="medicalHistory" rows="3" value={formData.medicalHistory} onChange={handleChange}></textarea>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Saving...' : 'Save Profile'}
          </button>

          {message && <p className="form-message">{message}</p>}
        </form>
      </div>
    </>
  );
};

export default ProfileForm;
