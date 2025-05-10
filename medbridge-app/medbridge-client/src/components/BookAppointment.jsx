import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const BookAppointment = () => {
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({
    doctor: '',
    date: '',
    notes: '',
    patient: ''   // Include patient here
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isPatientValid, setIsPatientValid] = useState(true);
  const navigate = useNavigate();

  // Fetch doctors + patientId
  useEffect(() => {
    const fetchInitialData = async () => {
      // Patient ID from localStorage
      const patientId = localStorage.getItem('userId');
      if (!patientId) {
        setIsPatientValid(false);
        setMessage('User not identified. Please log in again.');
        return;
      }

      setFormData(prev => ({ ...prev, patient: patientId }));

      // Fetch doctors
      try {
        const res = await axios.get('http://localhost:5000/api/doctors');
        const doctorNames = res.data.map(doc => doc.name);
        setDoctors(doctorNames);
      } catch (err) {
        console.error('Could not fetch doctors, using fallback list');
        setDoctors(['Dr. Smith', 'Dr. Patel', 'Dr. Lee']);
      }
    };
    fetchInitialData();
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

    try {
      setLoading(true);
      await axios.post('http://localhost:5000/api/appointments', formData);
      setMessage('Appointment booked successfully!');
      setFormData({ doctor: '', date: '', notes: '', patient: formData.patient }); // reset form but keep patient
      setTimeout(() => navigate('/dashboard'), 1500); // redirect after success
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

      {!isPatientValid ? (
        <div className="alert alert-danger text-center">{message}</div>
      ) : (
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
      )}

      <div className="text-center mt-3">
        <button className="btn btn-secondary" onClick={() => navigate('/dashboard')}>
          Back to Appointment History
        </button>
      </div>
    </div>
  );
};

export default BookAppointment;
