// controllers/prescriptionController.js
import {Prescription} from '../models/Prescription.js';

// @desc Get all prescriptions (admin or doctor view)
// @route GET /api/prescriptions
export const getAllPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find().sort({ date: -1 });
    res.status(200).json(prescriptions);
  } catch (err) {
    console.error('Error fetching all prescriptions:', err);
    res.status(500).json({ message: 'Failed to fetch prescriptions' });
  }
};

// @desc Get prescriptions by patientId (patient view)
// @route GET /api/prescriptions/patient/:patientId
export const getPrescriptionsByPatientId = async (req, res) => {
  const { patientId } = req.params;

  try {
    const prescriptions = await Prescription.find({ patientId }).sort({ date: -1 });
    res.status(200).json(prescriptions);
  } catch (error) {
    console.error('Error fetching prescriptions by patientId:', error);
    res.status(500).json({ message: 'Server error fetching prescriptions' });
  }
};
