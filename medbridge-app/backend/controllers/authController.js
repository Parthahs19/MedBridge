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
    if (role === 'patient') newUser = new Patient({ name, email, password: hashedPassword });
    if (role === 'doctor') newUser = new Doctor({ name, email, password: hashedPassword, specialization });
    if (role === 'admin') newUser = new Admin({ name, email, password: hashedPassword });

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

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({ token, role: user.role, name: user.name, id: user._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
