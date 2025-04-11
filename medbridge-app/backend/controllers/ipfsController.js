// backend/controllers/ipfsController.js
const { uploadToIPFS } = require('../utils/ipfs');
const MedBridge = require('../../contracts/MedBridge.json');
const { web3, contractInstance } = require('../utils/web3');

exports.uploadRecord = async (req, res) => {
  try {
    const { patientAddress } = req.body;
    const file = req.file;

    if (!file || !patientAddress) {
      return res.status(400).json({ msg: "Missing file or address" });
    }

    // Upload to IPFS
    const ipfsHash = await uploadToIPFS(file);

    // Store on Blockchain
    const accounts = await web3.eth.getAccounts();
    const sender = accounts[0]; // or use JWT session wallet

    await contractInstance.methods.addRecord(patientAddress, ipfsHash)
      .send({ from: sender });

    res.json({ ipfsHash });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error uploading record" });
  }
};
