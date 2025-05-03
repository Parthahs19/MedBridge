import React from 'react';
import { FaChartLine, FaFileMedical, FaPrescriptionBottleAlt, FaCalendarAlt, FaFolderOpen } from 'react-icons/fa';

const Sidebar = ({ activeSection, setActiveSection }) => {
  const menuItems = [
    { key: 'summary', label: 'Dashboard', icon: <FaChartLine /> },
    { key: 'timeline', label: 'Timeline', icon: <FaFileMedical /> },
    { key: 'prescriptions', label: 'Prescriptions', icon: <FaPrescriptionBottleAlt /> },
    { key: 'appointments', label: 'Appointments', icon: <FaCalendarAlt /> },
    { key: 'reports', label: 'Patient Reports', icon: <FaFolderOpen /> },
  ];

  return (
    <aside className="sidebar">
      <ul>
        {menuItems.map(item => (
          <li
            key={item.key}
            className={activeSection === item.key ? 'active' : ''}
            onClick={() => setActiveSection(item.key)}
          >
            {item.icon} <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
