import React from 'react';

const AppointmentHistory = () => {
  const appointments = [
    { date: "2025-02-12", doctor: "Dr. Smith", notes: "Routine follow-up" },
    { date: "2024-10-02", doctor: "Dr. Maya", notes: "Respiratory check" },
  ];

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Date</th>
          <th>Doctor</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        {appointments.map((appt, i) => (
          <tr key={i}>
            <td>{appt.date}</td>
            <td>{appt.doctor}</td>
            <td>{appt.notes}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AppointmentHistory;
