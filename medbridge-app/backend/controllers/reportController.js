import Report from '../models/Report.js';
import { uploadToIPFS } from '../utils/ipfsHelper.js';
import { uploadReportMetadata, grantReportAccess, revokeReportAccess, viewReportMetadata } from '../utils/medBridgeReportService.js';

/**
 * Upload Report (MongoDB + IPFS + Blockchain Metadata)
 * Required: patientWallet (Ethereum address) in request body
 */
export const uploadReport = async (req, res) => {
  try {
    const { patientId, title, description, reportDate, doctor, reportType, remarks } = req.body;
    const file = req.file;

    if (!patientId || !title || !reportDate || !doctor || !file) {
      return res.status(400).json({ message: 'Required fields or file missing' });
    }

    const { cid, fileType } = await uploadToIPFS(file);
    const reportId = `REP-${Date.now()}`;

    const newReport = new Report({
      reportId,
      patientId,
      title,
      description,
      reportDate,
      doctor,
      reportType,
      ipfsCid: cid,
      fileType,
      remarks
    });

    await newReport.save();

    res.status(201).json({ message: 'Report uploaded successfully', report: newReport });
  } catch (err) {
    console.error('Upload Report Error:', err);
    res.status(500).json({ error: 'Failed to upload report', details: err.message });
  }
};

/**
 * View Reports (optionally filter by patientId)
 * GET /api/reports?patient=patientId
 */
export const getAllReports = async (req, res) => {
  try {
    const { patient } = req.query;

    const query = {};
    if (patient) {
      query.patientId = patient;
    }

    const reports = await Report.find(query).sort({ reportDate: -1 });

    res.status(200).json(reports);
  } catch (err) {
    console.error('Fetch Reports Error:', err);
    res.status(500).json({ error: 'Failed to fetch reports', details: err.message });
  }
};

/**
 * View Blockchain Metadata of a report (by reportId)
 */
export const getBlockchainMetadata = async (req, res) => {
  const { reportId, requesterWallet } = req.query;

  if (!reportId || !requesterWallet) {
    return res.status(400).json({ message: 'reportId and requesterWallet are required' });
  }

  try {
    const metadata = await viewReportMetadata(reportId, requesterWallet);

    res.status(200).json({
      reportId: metadata[0],
      ipfsCid: metadata[1],
      sharedWith: metadata[2],
      isShared: metadata[3]
    });
  } catch (err) {
    console.error('Fetch Blockchain Metadata Error:', err);
    res.status(500).json({ error: 'Failed to fetch blockchain metadata', details: err.message });
  }
};

/**
 * Grant Access to a Report (by reportId)
 */
export const grantAccess = async (req, res) => {
  const { reportId, recipientWallet, patientWallet } = req.body;

  if (!reportId || !recipientWallet || !patientWallet) {
    return res.status(400).json({ message: 'reportId, recipientWallet, and patientWallet are required' });
  }

  try {
    const result = await grantReportAccess(reportId, recipientWallet, patientWallet);
    
    if (result.success) {
      res.status(200).json({ message: 'Access granted successfully', result: result.result });
    } else {
      res.status(500).json({ error: result.error });
    }
  } catch (err) {
    console.error('Error granting access:', err);
    res.status(500).json({ error: 'Failed to grant access', details: err.message });
  }
};

/**
 * Revoke Access to a Report (by reportId)
 */
export const revokeAccess = async (req, res) => {
  const { reportId, patientWallet } = req.body;

  if (!reportId || !patientWallet) {
    return res.status(400).json({ message: 'reportId and patientWallet are required' });
  }

  try {
    const result = await revokeReportAccess(reportId, patientWallet);

    if (result.success) {
      res.status(200).json({ message: 'Access revoked successfully', result: result.result });
    } else {
      res.status(500).json({ error: result.error });
    }
  } catch (err) {
    console.error('Error revoking access:', err);
    res.status(500).json({ error: 'Failed to revoke access', details: err.message });
  }
};

/**
 * View Report Metadata (from Blockchain)
 */
export const viewReport = async (req, res) => {
  const { reportId, requesterWallet } = req.query;

  if (!reportId || !requesterWallet) {
    return res.status(400).json({ message: 'reportId and requesterWallet are required' });
  }

  try {
    const metadata = await viewReportMetadata(reportId, requesterWallet);

    if (metadata) {
      res.status(200).json({
        reportId: metadata[0],
        ipfsCid: metadata[1],
        sharedWith: metadata[2],
        isShared: metadata[3]
      });
    } else {
      res.status(404).json({ error: 'Report not found or access denied' });
    }
  } catch (err) {
    console.error('Error fetching report metadata:', err);
    res.status(500).json({ error: 'Failed to fetch report metadata', details: err.message });
  }
};
