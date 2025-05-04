import Web3 from 'web3';
import MedBridgeReportArtifact from '../../build/contracts/MedBridgeReport.json' assert { type: 'json' };

// Connect to Ganache or Sepolia
const web3 = new Web3('http://127.0.0.1:7545'); // Update to Sepolia URL when transitioning to mainnet

// Get network ID and deployed contract address
const networkId = await web3.eth.net.getId();
const deployedNetwork = MedBridgeReportArtifact.networks[networkId];
const contract = new web3.eth.Contract(MedBridgeReportArtifact.abi, deployedNetwork.address);

// Upload Report Metadata to the blockchain (upload the report IPFS CID)
export const uploadReportMetadata = async (reportId, ipfsCid, patientWallet) => {
  try {
    // Send transaction to store report metadata in the blockchain
    const result = await contract.methods.uploadReport(reportId, ipfsCid).send({ from: patientWallet });
    return { success: true, result };
  } catch (error) {
    console.error('Error uploading report metadata:', error);
    return { success: false, error: error.message };
  }
};

// Grant access to a specific report for a recipient wallet (the recipient can now view the report)
export const grantReportAccess = async (reportId, recipientWallet, patientWallet) => {
  try {
    // Send transaction to grant access
    const result = await contract.methods.grantAccess(reportId, recipientWallet).send({ from: patientWallet });
    return { success: true, result };
  } catch (error) {
    console.error('Error granting report access:', error);
    return { success: false, error: error.message };
  }
};

// Revoke access to a specific report from a recipient wallet
export const revokeReportAccess = async (reportId, patientWallet) => {
  try {
    // Send transaction to revoke access
    const result = await contract.methods.revokeAccess(reportId).send({ from: patientWallet });
    return { success: true, result };
  } catch (error) {
    console.error('Error revoking report access:', error);
    return { success: false, error: error.message };
  }
};

// View report metadata (only accessible to authorized wallets)
export const viewReportMetadata = async (reportId, requesterWallet) => {
  try {
    // Fetch report metadata from the contract
    const result = await contract.methods.viewReport(reportId).call({ from: requesterWallet });
    return { success: true, result };
  } catch (error) {
    console.error('Error viewing report metadata:', error);
    return { success: false, error: error.message };
  }
};
