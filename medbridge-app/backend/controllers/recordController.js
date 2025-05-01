import { Record } from '../models/Record.js';

export const getAllRecords = async (req, res) => {
  try {
    const records = await Record.find().sort({ date: -1 });
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
