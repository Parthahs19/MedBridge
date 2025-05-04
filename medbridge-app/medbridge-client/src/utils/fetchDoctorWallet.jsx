// utils/fetchDoctorWallet.js
import axios from 'axios';

export const fetchDoctorWallet = async () => {
  const userId = localStorage.getItem('userId'); // assuming stored during login
  if (!userId) {
    throw new Error('User ID not found in localStorage');
  }

  try {
    const res = await axios.get(`/api/doctors/${userId}/wallet`);
    return res.data.walletAddress;  // return wallet address only
  } catch (err) {
    throw new Error('Error fetching wallet address');
  }
};
