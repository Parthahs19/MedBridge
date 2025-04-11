module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost
      port: 7545,            // Default Ganache port
      network_id: "*",       // Match any network
    }
  },
  compilers: {
    solc: {
      version: "0.8.17",      // Match your Solidity version
    }
  }
};
