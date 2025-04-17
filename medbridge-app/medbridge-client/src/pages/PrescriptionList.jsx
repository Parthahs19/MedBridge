import React from 'react';

const PrescriptionList = () => {
  const prescriptions = [
    { date: "2024-12-05", doctor: "Dr. Smith", summary: "Paracetamol 500mg, Vitamin D3" },
    { date: "2024-09-22", doctor: "Dr. Amanda", summary: "Loratadine 10mg for allergies" },
  ];

  return (
    <div className="prescription-list">
      {prescriptions.map((item, idx) => (
        <div key={idx} className="prescription-card">
          <h6>{item.date} - {item.doctor}</h6>
          <p>{item.summary}</p>
        </div>
      ))}
    </div>
  );
};

export default PrescriptionList;
