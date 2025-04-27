import React, { useState } from 'react';
import './DoctorDashboard.css'; // Custom CSS
import AddModal from '../components/AddModel';
import EditModal from '../components/EditModel';
import Pagination from '../components/Pagination';

const DoctorDashboard = () => {
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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const currentPatients = patients.slice((currentPage - 1) * patientsPerPage, currentPage * patientsPerPage);

  return (
    <div className="doctor-dashboard">
      <h1 className="doctor-title">Doctor Dashboard</h1>
      <div className="doctor-header">
        <button onClick={() => setIsAddModalOpen(true)} className="doctor-add-btn">Add Patient</button>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>

      <div className="doctor-grid">
        {currentPatients.map((patient) => (
          <div key={patient.id} className="doctor-card">
            <h3>{patient.name}</h3>
            <p>Age: {patient.age}</p>
            <p>Condition: {patient.condition}</p>
            <div className="doctor-actions">
              <button onClick={() => { setActivePatient(patient); setIsEditModalOpen(true); }} className="doctor-edit-btn">Edit</button>
            </div>
          </div>
        ))}
      </div>

      <AddModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAdd={handleAddPatient} />
      {activePatient && <EditModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} onSave={handleEditPatient} patient={activePatient} />}
    </div>
  );
};

export default DoctorDashboard;
