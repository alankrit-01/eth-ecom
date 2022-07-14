require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks:{
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/08d0a9d1045146dc888e62677f83e772", //Infura url with projectId
      accounts: ["28c80c76dc8dbfb442d93503d7583f645d96881346129be7ef74c01a8ad13378","dc32242523cf610bf7c16b778a5629337e4a213cec81b837e05a2a34bd73e5b9"] // add the account that will deploy the contract (private key)
      // ["anon.test","alankrit.test"]
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./frontend/src/cache",
    artifacts: "./frontend/src/artifacts"
  },
  mocha: {
    timeout: 100000000
  }
};
