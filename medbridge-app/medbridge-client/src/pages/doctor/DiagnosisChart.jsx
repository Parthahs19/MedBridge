// src/pages/Doctor/DiagnosisChart.jsx
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#a83279', '#2ebf91'];

const DiagnosisChart = ({ records }) => {
  const diagnosisCounts = records.reduce((acc, rec) => {
    acc[rec.diagnosis] = (acc[rec.diagnosis] || 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(diagnosisCounts).map(([diagnosis, count]) => ({
    name: diagnosis,
    value: count,
  }));

  if (data.length === 0) {
    return <p>No diagnosis data to display.</p>;
  }

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            dataKey="value"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DiagnosisChart;
