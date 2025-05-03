import { Record } from '../models/Record.js';

// GET all records
export const getAllRecords = async (req, res) => {
  try {
    const records = await Record.find().sort({ date: -1 });
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch records', error: err.message });
  }
};

// GET record by ID
export const getRecordById = async (req, res) => {
  const { id } = req.params;
  try {
    const record = await Record.findById(id);
    if (!record) {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.json(record);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch record', error: err.message });
  }
};

// CREATE new record
export const createRecord = async (req, res) => {
  const { recordId, date, title, description, patientId, diagnosis, treatment, doctorId } = req.body;

  if (!recordId || !date || !title || !description || !patientId || !diagnosis || !doctorId) {
    return res.status(400).json({ message: 'All required fields must be provided' });
  }

  try {
    const newRecord = new Record({
      recordId,
      date,
      title,
      description,
      patientId,
      diagnosis,
      treatment,
      doctorId,
    });

    await newRecord.save();
    res.status(201).json(newRecord);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create record', error: err.message });
  }
};

// UPDATE record by ID
export const updateRecord = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedRecord = await Record.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedRecord) {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.json(updatedRecord);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update record', error: err.message });
  }
};

// DELETE record by ID
export const deleteRecord = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRecord = await Record.findByIdAndDelete(id);
    if (!deletedRecord) {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.json({ message: 'Record deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete record', error: err.message });
  }
};
