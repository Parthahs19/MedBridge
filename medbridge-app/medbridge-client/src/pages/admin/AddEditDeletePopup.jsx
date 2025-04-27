import React, { useState } from 'react';
import './AddEditDeletePopup.css';

const AddEditDeletePopup = ({ onClose }) => {
  const [recordName, setRecordName] = useState('');
  const [action, setAction] = useState('add');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`${action.toUpperCase()} record: ${recordName}`);
    onClose();
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Manage Record</h2>
        <form onSubmit={handleSubmit}>
          <select value={action} onChange={(e) => setAction(e.target.value)} required>
            <option value="add">Add Record</option>
            <option value="edit">Edit Record</option>
            <option value="delete">Delete Record</option>
          </select>

          <input
            type="text"
            placeholder="Record Name"
            value={recordName}
            onChange={(e) => setRecordName(e.target.value)}
            required
          />

          <div className="popup-actions">
            <button type="submit">{action.charAt(0).toUpperCase() + action.slice(1)} Record</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditDeletePopup;
