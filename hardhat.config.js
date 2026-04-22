require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

// Environment Validation Check
if (!process.env.MEV_ROUTER_ADDRESS) {
  console.warn("\n[WARNING] MEV_ROUTER_ADDRESS missing. Ensure local config is generated via 'npm run dev' before deployment.\n");
}

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.24", // Latest stable compiler for LVR mitigation
        settings: {
          viaIR: true, // Intermediate Representation pipeline enabled for Yul optimization
          optimizer: {
            enabled: true,
            runs: 9999, // Maximized for runtime gas efficiency (critical for MEV)
            details: {
              yulDetails: {
                optimizerSteps: "u",
              },
            },
          },
          evmVersion: "shanghai", // Targets latest L1 opcodes
        },
      },
    ],
  },
  networks: {
    // Local simulation environment
    hardhat: {
      forking: {
        url: process.env.L1_RPC_URL || "https://eth-mainnet.g.alchemy.com/v2/demo",
        enabled: process.env.FORK_MAINNET === "true",
      },
      allowUnlimitedContractSize: true,
    },
    // The Execution Anchor Network
    mainnet: {
      url: process.env.L1_RPC_URL || "https://eth-mainnet.g.alchemy.com/v2/YOUR_API_KEY",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      gasPrice: "auto",
    },
    // The Polymarket Resolution Network
    polygon: {
      url: process.env.L2_RPC_URL || "https://polygon-mainnet.g.alchemy.com/v2/YOUR_API_KEY",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      gasPrice: "auto",
    }
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS === "true",
    currency: "USD",
    coinmarketcap: process.env.CMC_API_KEY || "",
    excludeContracts: ["MockRelay", "TestAnchor"],
  },
  etherscan: {
    apiKey: {
      mainnet: process.env.ETHERSCAN_API_KEY || "",
      polygon: process.env.POLYGONSCAN_API_KEY || "",
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 120000 // Extended timeout for cross-chain execution tests
  }
};