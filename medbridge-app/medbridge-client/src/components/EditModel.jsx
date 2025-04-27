import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const EditModal = ({ isOpen, onClose, onSave, patient }) => {
  const [formData, setFormData] = useState({ name: '', age: '', condition: '' });

  useEffect(() => {
    if (patient) setFormData(patient);
  }, [patient]);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.age && formData.condition) {
      onSave(formData);
      Swal.fire('Success', 'Record updated!', 'success');
      onClose();
    } else {
      Swal.fire('Error', 'All fields required!', 'error');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[400px]">
        <h2 className="text-2xl font-bold mb-4">Edit Patient</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input className="input" name="name" value={formData.name} onChange={handleChange} />
          <input className="input" name="age" value={formData.age} onChange={handleChange} />
          <input className="input" name="condition" value={formData.condition} onChange={handleChange} />
          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
            <button type="submit" className="btn-primary">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
