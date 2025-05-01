import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { Loader2 } from 'lucide-react';
import 'react-calendar/dist/Calendar.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const AppointmentHistory = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAppt, setSelectedAppt] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/appointments')
      .then(res => res.json())
      .then(data => {
        setAppointments(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching appointments:', err);
        setLoading(false);
      });
  }, []);

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const dayAppts = appointments.filter(appt =>
        new Date(appt.date).toDateString() === date.toDateString()
      );
      if (dayAppts.length > 0) {
        const apptDate = new Date(dayAppts[0].date);
        const today = new Date();
        let bgColor = '#0d6efd'; // future default blue

        if (apptDate < today.setHours(0, 0, 0, 0)) {
          bgColor = '#6c757d'; // past = grey
        } else if (apptDate.toDateString() === new Date().toDateString()) {
          bgColor = '#198754'; // today = green
        }

        return (
          <div
            title={dayAppts.map(a => a.doctor).join(', ')}
            style={{
              backgroundColor: bgColor,
              borderRadius: '50%',
              width: 10,
              height: 10,
              margin: '0 auto',
              marginTop: 2,
            }}
          ></div>
        );
      }
    }
    return null;
  };

  const handleDateClick = (date) => {
    const clickedAppts = appointments.filter(appt =>
      new Date(appt.date).toDateString() === date.toDateString()
    );
    setSelectedAppt(clickedAppts);
    setSelectedDate(date);
    setShowModal(true);
  };

  const calendarStyle = {
    maxWidth: '500px',
    margin: '0 auto',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
        <Loader2 className="animate-spin" style={{ width: '40px', height: '40px', color: '#0d6efd' }} />
      </div>
    );
  }

  return (
    <div style={{ padding: '40px 0' }}>
      <h2 className="text-center mb-4" style={{ fontSize: '2rem', fontWeight: '700', color: '#212529' }}>
        Appointment History
      </h2>
      <div style={calendarStyle}>
        <Calendar
          onClickDay={handleDateClick}
          tileContent={tileContent}
          // maxDate={new Date()} // disable future if it's only history
        />
      </div>
      <div className="d-flex justify-content-center gap-4 mt-3">
  <span><span style={{ display: 'inline-block', width: 12, height: 12, borderRadius: '50%', background: '#6c757d', marginRight: 6 }}></span> Past</span>
  <span><span style={{ display: 'inline-block', width: 12, height: 12, borderRadius: '50%', background: '#198754', marginRight: 6 }}></span> Today</span>
  <span><span style={{ display: 'inline-block', width: 12, height: 12, borderRadius: '50%', background: '#0d6efd', marginRight: 6 }}></span> Future</span>
</div>

      {/* Modal */}
      {showModal && selectedAppt.length > 0 && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">
                  Appointments on {selectedDate.toLocaleDateString()}
                </h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                {selectedAppt.map((appt, idx) => (
                  <div key={idx} className="mb-3 p-3 border rounded bg-light">
                    <p><strong>Doctor:</strong> {appt.doctor}</p>
                    <p><strong>Notes:</strong> {appt.notes}</p>
                  </div>
                ))}
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentHistory;
