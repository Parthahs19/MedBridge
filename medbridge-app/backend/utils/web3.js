// backend/utils/web3.js
const Web3 = require("web3");
const MedBridgeArtifact = require("../../build/contracts/MedBridge.json");

const web3 = new Web3("http://127.0.0.1:7545"); // Ganache

const networkId = Object.keys(MedBridgeArtifact.networks)[0];
const deployedNetwork = MedBridgeArtifact.networks[networkId];

const contract = new web3.eth.Contract(
  MedBridgeArtifact.abi,
  deployedNetwork && deployedNetwork.address
);
const contractInstance = new web3.eth.Contract(contractJson.abi, contractAddress);


module.exports = {contract,contractInstance };

