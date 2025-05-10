// controllers/appointmentController.js
import {Appointment} from '../models/Appointment.js';

// GET all appointments
export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ date: 1 });
    res.status(200).json(appointments);
  } catch (err) {
    console.error('Error fetching appointments:', err);
    res.status(500).json({ message: 'Failed to fetch appointments' });
  }
};

// GET appointments by patientId
export const getAppointmentsByPatientId = async (req, res) => {
  const { patientId } = req.params;

  try {
    const appointments = await Appointment.find({ patient: patientId }).sort({ date: 1 });
    res.status(200).json(appointments);
  } catch (error) {
    console.error('Error fetching appointments for patient:', error);
    res.status(500).json({ message: 'Server error fetching appointments by patientId' });
  }
};

// CREATE appointment
export const createAppointment = async (req, res) => {
  const { doctor, patient, notes, date } = req.body;

  if (!doctor || !patient || !date) {
    return res.status(400).json({ message: 'Doctor, patient, and date are required' });
  }

  try {
    const newAppointment = new Appointment({ doctor, patient, notes, date });
    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (err) {
    console.error('Error creating appointment:', err);
    res.status(500).json({ message: 'Failed to create appointment' });
  }
};

// DELETE appointment
export const deleteAppointment = async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (err) {
    console.error('Error deleting appointment:', err);
    res.status(500).json({ message: 'Failed to delete appointment' });
  }
};
