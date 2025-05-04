// 2_deploy_medbridgereport.js (for MedBridgeReport contract)
const MedBridgeReport = artifacts.require("MedBridgeReport");

module.exports = function (deployer) {
  deployer.deploy(MedBridgeReport);
};
