const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["Admin", "Doctor", "Patient"], default: "Patient" },
  refreshToken: String, // New field
});

module.exports = mongoose.model("User", userSchema);
