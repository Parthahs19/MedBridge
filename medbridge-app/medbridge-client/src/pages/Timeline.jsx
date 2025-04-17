import React from 'react';

const Timeline = () => {
  const records = [
    { date: "2024-11-20", title: "Annual Health Check", description: "Blood test, ECG, Physical Exam" },
    { date: "2024-08-15", title: "Allergy Diagnosis", description: "Allergy test, medication prescribed" },
    { date: "2024-05-10", title: "Chest Infection", description: "X-Ray, antibiotics course" },
  ];

  return (
    <ul className="timeline">
      {records.map((record, index) => (
        <li key={index} className="timeline-item">
          <span className="timeline-date">{record.date}</span>
          <div className="timeline-content">
            <h5>{record.title}</h5>
            <p>{record.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Timeline;
