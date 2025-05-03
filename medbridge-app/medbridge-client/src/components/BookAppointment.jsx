import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const BookAppointment = () => {
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({
    doctor: '',
    date: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Fetch doctors list
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/doctors');
        const doctorNames = res.data.map(doc => doc.name);
        setDoctors(doctorNames);
      } catch (err) {
        console.error('Could not fetch doctors, using fallback list');
        setDoctors(['Dr. Smith', 'Dr. Patel', 'Dr. Lee']);
      }
    };
    fetchDoctors();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.doctor || !formData.date) {
      setMessage('Please fill all required fields');
      return;
    }

    // Get patientId from localStorage
    const patientId = localStorage.getItem('userId');   // ✅ No JSON.parse()
    
    if (!patientId) {
      setMessage('User not identified. Please log in again.');
      return;
    }

    const dataToSend = {
      ...formData,
      patient: patientId  // IMPORTANT: Backend expects key name as 'patient'
    };

    try {
      setLoading(true);
      await axios.post('http://localhost:5000/api/appointments', dataToSend);
      setMessage('Appointment booked successfully!');
      setFormData({ doctor: '', date: '', notes: '' });
    } catch (err) {
      console.error(err);
      setMessage('Error booking appointment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      maxWidth: '600px',
      margin: '50px auto',
      padding: '30px',
      background: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
    }}>
      <h2 className="text-center mb-4" style={{ fontSize: '2rem', fontWeight: '700', color: '#212529' }}>
        Book New Appointment
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Select Doctor<span style={{ color: 'red' }}> *</span></label>
          <select name="doctor" className="form-select" value={formData.doctor} onChange={handleChange} required>
            <option value="">-- Select Doctor --</option>
            {doctors.map((doc, idx) => (
              <option key={idx} value={doc}>{doc}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Date<span style={{ color: 'red' }}> *</span></label>
          <input type="date" name="date" className="form-control" value={formData.date} onChange={handleChange} required min={new Date().toISOString().split('T')[0]} />
        </div>

        <div className="mb-3">
          <label className="form-label">Notes (optional)</label>
          <textarea name="notes" className="form-control" rows="3" value={formData.notes} onChange={handleChange}></textarea>
        </div>

        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? 'Booking...' : 'Book Appointment'}
        </button>

        {message && <div className="alert alert-info text-center mt-3">{message}</div>}
      </form>

      <div className="text-center mt-3">
        <button className="btn btn-secondary" onClick={() => navigate('/dashboard')}>
          Back to Appointment History
        </button>
      </div>
    </div>
  );
};

export default BookAppointment;
