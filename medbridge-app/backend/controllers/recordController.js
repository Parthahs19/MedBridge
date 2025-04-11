// backend/controllers/recordController.js
const Record = require("../models/Record");
const contract = require("../utils/web3");

exports.addRecord = async (req, res) => {
  const { patientAddress, ipfsHash } = req.body;
  const doctorAddress = req.user.address;

  try {
    await contract.methods
      .addRecord(patientAddress, ipfsHash)
      .send({ from: doctorAddress });

    const newRecord = new Record({
      patientAddress,
      ipfsHash,
      uploadedBy: doctorAddress,
    });

    await newRecord.save();
    res.status(200).json({ msg: "Record added to blockchain & DB ✅" });
  } catch (err) {
    res.status(500).json({ msg: "Blockchain Tx failed", error: err.message });
  }
};

exports.getRecords = async (req, res) => {
  const { patientAddress } = req.params;
  const user = req.user;

  if (
    user.address !== patientAddress &&
    user.role !== "Admin" &&
    user.role !== "Doctor"
  ) {
    return res.status(403).json({ msg: "Unauthorized to view records" });
  }

  try {
    const records = await contract.methods.getRecords(patientAddress).call();
    res.json(records);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching records", error: err.message });
  }
};
