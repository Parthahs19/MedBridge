import React from 'react';
import './Sidebar.css';
import { FaChartLine, FaUserMd, FaFileMedical, FaUsers } from 'react-icons/fa';

const Sidebar = ({ menuItems, onSelect }) => {
  return (
    <aside className="sidebar">
      <ul>
        {menuItems.map((item, idx) => (
          <li key={idx} onClick={() => onSelect(item.key)}>
            {item.icon} {item.label}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
