// routes/patientRoutes.js
import express from 'express';
import Patient from '../models/Patient.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Get patient profile
// @route   GET /api/patient/profile
// @access  Private (Patient only)
router.get('/', protect(['patient']), async (req, res) => {
  try {
    const patient = await Patient.findById(req.user.id).select(
      'name email dob contactNumber address medicalHistory'
    );

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.json({
      fullName: patient.name,
      email: patient.email,
      dob: patient.dob,
      phone: patient.contactNumber,
      address: patient.address,
      medicalHistory: patient.medicalHistory,
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Update patient profile (with validation)
// @route   POST /api/patient/profile
// @access  Private (Patient only)
router.post('/', protect(['patient']), async (req, res) => {
    try {
      const { fullName, email, dob, phone, address, medicalHistory } = req.body;
  
      // Basic validation
      if (!fullName || fullName.length < 2) {
        return res.status(400).json({ message: 'Full name is required and must be at least 2 characters' });
      }
  
      if (email && !/^\S+@\S+\.\S+$/.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
      }
  
      if (phone && !/^\d{10}$/.test(phone)) {
        return res.status(400).json({ message: 'Phone number must be 10 digits' });
      }
  
      if (dob && isNaN(Date.parse(dob))) {
        return res.status(400).json({ message: 'Invalid date of birth' });
      }
  
      const patient = await Patient.findById(req.user.id);
      if (!patient) {
        return res.status(404).json({ message: 'Patient not found' });
      }
  
      // Update fields
      patient.name = fullName;
      patient.email = email || patient.email;
      patient.dob = dob || patient.dob;
      patient.contactNumber = phone || patient.contactNumber;
      patient.address = address || patient.address;
      patient.medicalHistory = medicalHistory || patient.medicalHistory;
  
      await patient.save();
  
      res.json({ message: 'Profile updated successfully' });
    } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
export default router;
