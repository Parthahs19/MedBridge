// 1_deploy_medbridge.js (for MedBridge contract)
const MedBridge = artifacts.require("MedBridge");

module.exports = function (deployer) {
  deployer.deploy(MedBridge);
};
