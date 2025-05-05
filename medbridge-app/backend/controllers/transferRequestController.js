// controllers/transferRequestController.js
import TransferRequest from '../models/TransferRequest.js';
import axios from 'axios';

// Raise Transfer Request (Hospital A → Hospital B)
export const raiseTransferRequest = async (req, res) => {
  const { patientId, reportId, doctorId, requestedBy, hospitalFrom, hospitalTo, ipfsCid, targetHospitalApi } = req.body;

  try {
    const newRequest = new TransferRequest({
      patientId,
      reportId,
      doctorId,
      requestedBy,
      hospitalFrom,
      hospitalTo,
      ipfsCid
    });
    await newRequest.save();

    // Notify Hospital B backend
    await axios.post(`${targetHospitalApi}/api/transferRequests/receiveRequest`, {
      patientId,
      reportId,
      doctorId,
      requestedBy,
      hospitalFrom,
      hospitalTo,
      ipfsCid
    });

    res.status(201).json({ message: 'Transfer request raised and sent to Hospital B' });
  } catch (err) {
    console.error('Error raising transfer request:', err);
    res.status(500).json({ message: 'Error raising transfer request' });
  }
};

// Receive Request (Hospital B)
export const receiveRequest = async (req, res) => {
  const { patientId, reportId, doctorId, requestedBy, hospitalFrom, hospitalTo, ipfsCid } = req.body;

  try {
    const receivedRequest = new TransferRequest({
      patientId,
      reportId,
      doctorId,
      requestedBy,
      hospitalFrom,
      hospitalTo,
      ipfsCid
    });
    await receivedRequest.save();

    res.status(201).json({ message: 'Request received and stored in Hospital B' });
  } catch (err) {
    console.error('Error receiving request:', err);
    res.status(500).json({ message: 'Error receiving request' });
  }
};

// Doctor at Hospital B requests patient approval
export const requestPatientApproval = async (req, res) => {
  const { requestId } = req.params;

  try {
    const request = await TransferRequest.findById(requestId);
    if (!request) return res.status(404).json({ message: 'Request not found' });

    // Set patient approval status to Pending
    request.patientApprovalStatus = 'Pending';
    await request.save();

    res.status(200).json({ message: 'Patient approval requested', request });
  } catch (err) {
    console.error('Error requesting patient approval:', err);
    res.status(500).json({ message: 'Error requesting patient approval' });
  }
};

// Patient approves or rejects the request
export const patientRespondApproval = async (req, res) => {
  const { requestId } = req.params;
  const { approvalDecision } = req.body; // 'Approved' or 'Rejected'

  if (!['Approved', 'Rejected'].includes(approvalDecision)) {
    return res.status(400).json({ message: 'Invalid approval decision' });
  }

  try {
    const request = await TransferRequest.findById(requestId);
    if (!request) return res.status(404).json({ message: 'Request not found' });

    request.patientApprovalStatus = approvalDecision;
    await request.save();

    res.status(200).json({ message: `Patient ${approvalDecision.toLowerCase()} the request`, request });
  } catch (err) {
    console.error('Error recording patient decision:', err);
    res.status(500).json({ message: 'Error recording patient decision' });
  }
};

// Doctor at Hospital B approves and sends data (ONLY IF patient approved)
export const approveRequest = async (req, res) => {
  const { requestId } = req.params;
  const { approvedDataCid, remarks, targetHospitalApi } = req.body;

  try {
    const request = await TransferRequest.findById(requestId);
    if (!request) return res.status(404).json({ message: 'Request not found' });

    if (request.patientApprovalStatus !== 'Approved') {
      return res.status(400).json({ message: 'Cannot approve — patient has not approved the request' });
    }

    request.status = 'Approved';
    request.approvedDataCid = approvedDataCid;
    request.remarks = remarks;
    await request.save();

    // Notify Hospital A (reverse hospitalFrom/hospitalTo)
    await axios.post(`${targetHospitalApi}/api/transferRequests/receiveApprovedData`, {
      patientId: request.patientId,
      reportId: request.reportId,
      doctorId: request.doctorId,
      requestedBy: request.requestedBy,
      hospitalFrom: request.hospitalTo,
      hospitalTo: request.hospitalFrom,
      approvedDataCid,
      remarks
    });

    res.status(200).json({ message: 'Request approved and data sent to Hospital A' });
  } catch (err) {
    console.error('Error approving request:', err);
    res.status(500).json({ message: 'Error approving request' });
  }
};

// Receive Approved Data (Hospital A)
export const receiveApprovedData = async (req, res) => {
  const { patientId, reportId, doctorId, requestedBy, hospitalFrom, hospitalTo, approvedDataCid, remarks } = req.body;

  try {
    const newData = new TransferRequest({
      patientId,
      reportId,
      doctorId,
      requestedBy,
      hospitalFrom,
      hospitalTo,
      status: 'Approved',
      patientApprovalStatus: 'Approved',
      approvedDataCid,
      remarks
    });
    await newData.save();

    res.status(201).json({ message: 'Approved data received and stored in Hospital A' });
  } catch (err) {
    console.error('Error receiving approved data:', err);
    res.status(500).json({ message: 'Error receiving approved data' });
  }
};

// View all transfer requests (optional utility)
export const getAllRequests = async (req, res) => {
  try {
    const requests = await TransferRequest.find().sort({ createdAt: -1 });
    res.status(200).json(requests);
  } catch (err) {
    console.error('Error fetching requests:', err);
    res.status(500).json({ message: 'Error fetching requests' });
  }
};

