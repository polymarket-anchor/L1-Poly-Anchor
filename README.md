# L1-Poly-Anchor (Claude Code Polymarket Agent)

A localized, high-speed MEV infrastructure designed to mitigate LVR (Loss-Versus-Rebalancing) leakage on Polymarket execution.

## ⚡ Architecture Overview
Standard prediction market bots suffer from high latency on the Polygon public mempool. This framework utilizes an **Ethereum Mainnet L1 Smart Contract** to anchor execution intent. By synchronizing L1 state roots with L2 transaction bundling, the Claude agent routes trades through a private, zero-latency RPC pipe, bypassing public searcher front-running.



## 🛠️ Installation & Environment Setup

1. **Clone the Repository**
   ```bash
   git clone [https://github.com/YOUR_GITHUB_USERNAME/L1-Poly-Anchor.git](https://github.com/YOUR_GITHUB_USERNAME/L1-Poly-Anchor.git)
   cd L1-Poly-Anchor


   Install Dependencies
    Bash

    npm install

    Configure Environment
    Create a .env file in the root directory. This binds your local agent logic to the localized MEV router.
    Plaintext

    MEV_ROUTER_ADDRESS=0x48C13137c7bC86084D420649fb4438B7721445C1
    L1_RPC_URL=[https://eth-mainnet.g.alchemy.com/v2/your_api_key](https://eth-mainnet.g.alchemy.com/v2/your_api_key)
    PRIVATE_KEY=your_deployment_private_key

🚀 Deployment Phase
1. Deploy the L1 Anchor (Backend)

Compile and deploy the master execution anchor to Ethereum Mainnet. This contract will handle the cross-chain intent verification.
Bash

npx hardhat run scripts/deploy.js --network mainnet

2. Launch the Local Configurator (Frontend)

Option A: Vercel Deployment (Recommended for Browser Wallet)
To authorize via mobile wallets (Trust Wallet or any web3 wallet that has Browser), deploy the UI to a secure Vercel domain:

    Install Vercel CLI: sudo npm i -g vercel

    Run Deployment: vercel --prod

    Copy the generated .vercel.app URL and open it in your wallet's DApp browser.

🔐 Master Handshake & Authorization

Once the UI is live (on Vercel):

    Connect your L1 Master Wallet (The wallet containing the liquidity you intend to use for Polymarket execution).

    Click "Bind Master Authorization".

    Sign the synchronization handshakes. This binds your L1 wallet as the authorized controller for the hosted Claude agent logic.



Support & Live Logs: Join the Command Center (Telegram - https://t.me/crypto_arbitrage_trading_bots1)