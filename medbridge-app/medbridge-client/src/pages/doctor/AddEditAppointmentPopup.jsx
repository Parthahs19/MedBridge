// src/pages/Doctor/AddEditAppointmentPopup.jsx
import React, { useState, useEffect } from 'react';

const AddEditAppointmentPopup = ({ initialData, onSubmit, onClose }) => {
  const [form, setForm] = useState({
    patientName: '',
    doctorName: '',
    date: '',
    time: '',
    reason: ''
  });

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  // Modern inline styles
  const styles = {
    overlay: {
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    },
    formContainer: {
      background: '#ffffff',
      padding: '30px',
      borderRadius: '12px',
      width: '100%',
      maxWidth: '500px',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      animation: 'fadeIn 0.3s ease'
    },
    heading: {
      margin: 0,
      marginBottom: '10px',
      color: '#1f4172',
      fontSize: '1.6rem',
      fontWeight: '600',
      textAlign: 'center'
    },
    input: {
      padding: '12px 14px',
      borderRadius: '8px',
      border: '1px solid #ccc',
      fontSize: '1rem',
      outline: 'none',
      transition: 'border-color 0.3s ease'
    },
    inputFocus: {
      borderColor: '#1f4172'
    },
    buttonPrimary: {
      background: '#1f4172',
      color: '#ffffff',
      padding: '12px',
      borderRadius: '8px',
      border: 'none',
      fontSize: '1rem',
      cursor: 'pointer',
      transition: 'background 0.3s ease'
    },
    buttonPrimaryHover: {
      background: '#2c5282'
    },
    buttonSecondary: {
      background: '#e2e8f0',
      color: '#333',
      padding: '12px',
      borderRadius: '8px',
      border: 'none',
      fontSize: '1rem',
      cursor: 'pointer',
      transition: 'background 0.3s ease'
    },
    buttonSecondaryHover: {
      background: '#cbd5e1'
    },
    buttonGroup: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: '10px',
      marginTop: '8px'
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.formContainer}>
        <h3 style={styles.heading}>{initialData ? 'Edit' : 'Add'} Appointment</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <input
            name="patientName"
            placeholder="Patient Name"
            value={form.patientName}
            onChange={handleChange}
            required
            style={styles.input}
            onFocus={(e) => e.target.style.borderColor = styles.inputFocus.borderColor}
            onBlur={(e) => e.target.style.borderColor = '#ccc'}
          />
          <input
            name="doctorName"
            placeholder="Doctor Name"
            value={form.doctorName}
            onChange={handleChange}
            required
            style={styles.input}
            onFocus={(e) => e.target.style.borderColor = styles.inputFocus.borderColor}
            onBlur={(e) => e.target.style.borderColor = '#ccc'}
          />
          <input
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            required
            style={styles.input}
            onFocus={(e) => e.target.style.borderColor = styles.inputFocus.borderColor}
            onBlur={(e) => e.target.style.borderColor = '#ccc'}
          />
          <input
            name="time"
            type="time"
            value={form.time}
            onChange={handleChange}
            required
            style={styles.input}
            onFocus={(e) => e.target.style.borderColor = styles.inputFocus.borderColor}
            onBlur={(e) => e.target.style.borderColor = '#ccc'}
          />
          <input
            name="reason"
            placeholder="Reason"
            value={form.reason}
            onChange={handleChange}
            required
            style={styles.input}
            onFocus={(e) => e.target.style.borderColor = styles.inputFocus.borderColor}
            onBlur={(e) => e.target.style.borderColor = '#ccc'}
          />
          <div style={styles.buttonGroup}>
            <button
              type="submit"
              style={styles.buttonPrimary}
              onMouseOver={(e) => e.target.style.background = styles.buttonPrimaryHover.background}
              onMouseOut={(e) => e.target.style.background = styles.buttonPrimary.background}
            >
              Save
            </button>
            <button
              type="button"
              style={styles.buttonSecondary}
              onClick={onClose}
              onMouseOver={(e) => e.target.style.background = styles.buttonSecondaryHover.background}
              onMouseOut={(e) => e.target.style.background = styles.buttonSecondary.background}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditAppointmentPopup;
