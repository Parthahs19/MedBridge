import React from 'react';

const Records = () => {
  return (
    <div>
      <h4>Medical Records</h4>
      <table className="table table-hover table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Patient</th>
            <th>Doctor</th>
            <th>Date</th>
            <th>Record Type</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John Doe</td>
            <td>Dr. Smith</td>
            <td>2025-04-11</td>
            <td>Lab Report</td>
          </tr>
          <tr>
            <td>Jane Roe</td>
            <td>Dr. Adams</td>
            <td>2025-04-10</td>
            <td>Scan</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Records;
