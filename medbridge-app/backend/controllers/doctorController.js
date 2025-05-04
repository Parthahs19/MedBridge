import Doctor from '../models/Doctor.js';

export const getDoctorWallet = async (req, res) => {
  try {
    const doctorId = req.params.id;
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({ msg: 'Doctor not found' });
    }

    res.json({
      walletAddress: doctor.walletAddress || null
    });
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching wallet', error: err.message });
  }
};
