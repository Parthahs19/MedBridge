import React, { useState } from 'react';
import './AdminDashboard.css'; // Custom CSS
import AddModal from '../components/AddModel';
import EditModal from '../components/EditModel';
import Pagination from '../components/Pagination';

const AdminDashboard = () => {
  const [patients, setPatients] = useState([
    { id: 1, name: 'John Doe', age: 30, condition: 'Flu' },
    { id: 2, name: 'Jane Doe', age: 25, condition: 'Migraine' },
  ]);
  const [activePatient, setActivePatient] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const patientsPerPage = 5;
  const totalPages = Math.ceil(patients.length / patientsPerPage);

  const handleAddPatient = (newPatient) => {
    setPatients([...patients, { ...newPatient, id: patients.length + 1 }]);
  };

  const handleEditPatient = (updatedPatient) => {
    const updatedPatients = patients.map((patient) =>
      patient.id === updatedPatient.id ? updatedPatient : patient
    );
    setPatients(updatedPatients);
  };

  const handleDeletePatient = (id) => {
    const updatedPatients = patients.filter((patient) => patient.id !== id);
    setPatients(updatedPatients);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const currentPatients = patients.slice((currentPage - 1) * patientsPerPage, currentPage * patientsPerPage);

  return (
    <div className="admin-dashboard">
      <h1 className="admin-title">Admin Dashboard</h1>
      <div className="admin-header">
        <button onClick={() => setIsAddModalOpen(true)} className="admin-add-btn">Add Patient</button>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>

      <div className="admin-grid">
        {currentPatients.map((patient) => (
          <div key={patient.id} className="admin-card">
            <h3>{patient.name}</h3>
            <p>Age: {patient.age}</p>
            <p>Condition: {patient.condition}</p>
            <div className="admin-actions">
              <button onClick={() => { setActivePatient(patient); setIsEditModalOpen(true); }} className="admin-edit-btn">Edit</button>
              <button onClick={() => handleDeletePatient(patient.id)} className="admin-delete-btn">Delete</button>
            </div>
          </div>
        ))}
      </div>

      <AddModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAdd={handleAddPatient} />
      {activePatient && <EditModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} onSave={handleEditPatient} patient={activePatient} />}
    </div>
  );
};

export default AdminDashboard;
