import TransferRequest from '../models/TransferRequest.js';

/**
 * Doctor Raises a Request for Transferring Report to Another Hospital
 */
export const createTransferRequest = async (req, res) => {
  const { patientId, reportId, hospitalTo, doctorId } = req.body;
  const hospitalFrom = "MedBridge"; 
  console.log(patientId, reportId, hospitalTo, doctorId);
  if (!patientId || !reportId || !hospitalTo || !hospitalFrom || !doctorId) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const newTransferRequest = new TransferRequest({
      patientId,
      reportId,
      requestedBy: doctorId,
      hospitalFrom,
      hospitalTo,
      status: 'Pending', // Default status is pending when a request is raised
    });

    await newTransferRequest.save();

    res.status(201).json({ message: 'Transfer request raised successfully', transferRequest: newTransferRequest });
  } catch (err) {
    console.error('Error raising transfer request:', err);
    res.status(500).json({ error: 'Failed to raise transfer request', details: err.message });
  }
};

/**
 * Get All Transfer Requests for a Patient
 */
export const getPatientTransferRequests = async (req, res) => {
  const { patientId } = req.params;

  if (!patientId) {
    return res.status(400).json({ message: 'Patient ID is required' });
  }

  try {
    const transferRequests = await TransferRequest.find({ patientId }).sort({ createdAt: -1 });
    res.status(200).json(transferRequests);
  } catch (err) {
    console.error('Error fetching transfer requests for patient:', err);
    res.status(500).json({ error: 'Failed to fetch transfer requests for patient', details: err.message });
  }
};

/**
 * Get All Transfer Requests Raised by a Doctor (based on their wallet address)
 */
export const getDoctorRaisedRequests = async (req, res) => {
  const { doctorWallet } = req.params;

  if (!doctorWallet) {
    return res.status(400).json({ message: 'Doctor wallet address is required' });
  }

  try {
    const transferRequests = await TransferRequest.find({ requestedBy: doctorWallet }).sort({ createdAt: -1 });
    res.status(200).json(transferRequests);
  } catch (err) {
    console.error('Error fetching transfer requests raised by doctor:', err);
    res.status(500).json({ error: 'Failed to fetch transfer requests raised by doctor', details: err.message });
  }
};

/**
 * Patient Approves or Rejects the Transfer Request
 */
export const approveTransferRequest = async (req, res) => {
  const { transferRequestId, patientId, status } = req.body;

  if (!transferRequestId || !patientId || !status) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const transferRequest = await TransferRequest.findOne({ _id: transferRequestId, patientId });

    if (!transferRequest) {
      return res.status(404).json({ message: 'Transfer request not found' });
    }

    // Only the patient can approve or reject
    if (transferRequest.patientId !== patientId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Update the status of the transfer request (either 'Approved' or 'Rejected')
    transferRequest.status = status;
    await transferRequest.save();

    res.status(200).json({ message: `Transfer request ${status.toLowerCase()} successfully`, transferRequest });
  } catch (err) {
    console.error('Error updating transfer request:', err);
    res.status(500).json({ error: 'Failed to update transfer request', details: err.message });
  }
};



