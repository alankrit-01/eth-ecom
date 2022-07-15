require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config()
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
      url: process.env.RINKEBY_INFURA_KEY, //Infura url with projectId
      accounts: [process.env.ADMIN_PRIVATE_KEY] // add the account that will deploy the contract (private key)
      // ["ADMIN"]
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
