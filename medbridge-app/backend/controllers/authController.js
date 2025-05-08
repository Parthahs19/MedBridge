import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Patient from '../models/Patient.js';
import Doctor from '../models/Doctor.js';
import Admin from '../models/Admin.js';

export const registerUser = async (req, res) => {
  const { name, email, password, role, specialization } = req.body;

  try {
    let existingUser;
    if (role === 'patient') existingUser = await Patient.findOne({ email });
    if (role === 'doctor') existingUser = await Doctor.findOne({ email });
    if (role === 'admin') existingUser = await Admin.findOne({ email });

    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    let newUser;
    if (role === 'patient') {
      const lastPatient = await Patient.findOne().sort({ createdAt: -1 }).exec();
      let nextNumber = 1001;
      if (lastPatient && lastPatient.patientId) {
        const lastNumber = parseInt(lastPatient.patientId.split('-')[1]);
        nextNumber = lastNumber + 1;
      }
      const patientId = `P-${nextNumber}`;

      newUser = new Patient({ name, email, password: hashedPassword, patientId });
    }

    if (role === 'doctor') {
      const lastDoctor = await Doctor.findOne().sort({ createdAt: -1 }).exec();
      let nextNumber = 101;
      if (lastDoctor && lastDoctor.doctorId) {
        const lastNumber = parseInt(lastDoctor.doctorId.split('-')[1]);
        nextNumber = lastNumber + 1;
      }
      const doctorId = `D-${nextNumber}`;

      newUser = new Doctor({ name, email, password: hashedPassword, specialization, doctorId });
    }

    if (role === 'admin') {
      newUser = new Admin({ name, email, password: hashedPassword });
    }

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


export const loginUser = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    let user;
    if (role === 'patient') user = await Patient.findOne({ email });
    if (role === 'doctor') user = await Doctor.findOne({ email });
    if (role === 'admin') user = await Admin.findOne({ email });

    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const payload = {
      id: user._id,
      role: user.role
    };

    // Include custom patientId (only for patients)
    if (role === 'patient') {
      payload.patientId = user.patientId;
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Prepare response object with role-specific ID key
    let responseData = {
      token,
      role: user.role,
      name: user.name
    };

    if (role === 'patient') {
      responseData.patientId = user.patientId;
    } else if (role === 'doctor') {
      responseData.doctorId = user._id;
    } else if (role === 'admin') {
      responseData.adminId = user._id;
    }

    res.status(200).json(responseData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
