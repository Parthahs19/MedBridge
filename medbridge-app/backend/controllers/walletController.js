// controllers/walletController.js
import Doctor from '../models/Doctor.js';
import Patient from '../models/Patient.js';
import { ethers } from 'ethers';

export const generateWallet = async (req, res) => {
  try {
    const { userId, userType } = req.body;

    // Sanitize userType — remove extra quotes, trim and lowercase
    const cleanedUserType = (userType || '').toLowerCase().trim().replace(/^"(.*)"$/, '$1');

    if (!['doctor', 'patient'].includes(cleanedUserType)) {
      return res.status(400).json({ error: 'Invalid user type' });
    }

    // Dynamically get model based on userType
    const Model = cleanedUserType === 'doctor' ? Doctor : Patient;

    const user = await Model.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: `${cleanedUserType} not found` });
    }

    // Prevent duplicate wallet generation
    if (user.walletAddress) {
      return res.status(400).json({ msg: 'Wallet already generated' });
    }

    // Generate wallet
    const wallet = ethers.Wallet.createRandom();

    // Store walletAddress + privateKey
    user.walletAddress = wallet.address;
    user.privateKey = wallet.privateKey; // (optional: encrypt in prod)

    await user.save();

    res.json({
      msg: 'Wallet generated successfully',
      walletAddress: wallet.address
    });

  } catch (err) {
    res.status(500).json({ msg: 'Error generating wallet', error: err.message });
  }
};
