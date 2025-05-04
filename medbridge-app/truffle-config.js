module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*", // Match any network id (or use 5777 if Ganache shows that explicitly)
    },
  },
  compilers: {
    solc: {
      version: "0.8.17",  // Match your version
    },
  },
};

