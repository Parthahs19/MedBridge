import mongoose from 'mongoose';

const recordSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
});

export const Record = mongoose.model('Record', recordSchema);
