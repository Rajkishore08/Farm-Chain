# FarmChain

FarmChain is a blockchain-based platform that connects farmers directly with consumers, eliminating middlemen to ensure fair pricing, product authenticity, and transparency in the agricultural supply chain. The platform offers features like product traceability, geographic prioritization, and secure transactions using blockchain technology.

## Features

### 1. User Roles
#### Farmers:
- Register and list their products with details like price, location, and delivery range.
- Track sales and manage inventory.

#### Consumers:
- Browse products by type, price range, and location.
- Place orders directly from nearby farmers.
- Use filters to refine product searches.

### 2. Key Functionalities
- **Connect Wallet**: Securely connect your MetaMask wallet for transactions.
- **Filters**: Filter products by type (e.g., vegetables, fruits), price range, and location.
- **Product Cards**: View detailed product information, including price per kg, description, and location.
- **Cart Management**: Add products to the cart and adjust quantities before checkout.
- **Order History**: View past orders for easy tracking.
- **Trace Product**: Track the journey of a product from farm to table using blockchain.

### 3. Blockchain Integration
- Built on Ethereum or Binance Smart Chain (BSC) for secure and transparent transactions.
- Smart contracts handle farmer registration, product listing, order placement, and payments.

### 4. Geographic Prioritization
- Products are displayed based on proximity to the consumer's location.
- Delivery fees are calculated dynamically based on distance.

## Technology Stack

### Frontend
- **React.js**: For building a responsive user interface.
- **Bootstrap**: For styling components like filters and product cards.

### Backend
- **Node.js with Express.js**: For building RESTful APIs.
- **MongoDB**: For storing user profiles, products, and orders.

### Blockchain
- **Ethereum/Binance Smart Chain (BSC)**: For decentralized transactions.
- **Smart Contracts**: Written in Solidity for handling core functionalities.

### Wallet Integration
- **MetaMask** or **WalletConnect** for secure wallet interactions.

## Installation Guide

### Prerequisites
Ensure you have the following installed:
- Node.js (v16 or later)
- MongoDB (local or cloud instance)
- MetaMask browser extension

### Backend Setup
Clone the repository:
```bash
git clone https://github.com/yourusername/farmchain.git
cd farmchain/backend
```

Install dependencies:
```bash
npm install
```

Create a `.env` file in the backend directory:
```text
MONGO_URI=your_mongodb_connection_string
INFURA_PROJECT_ID=your_infura_project_id
PRIVATE_KEY=your_private_key
CONTRACT_ADDRESS=your_deployed_contract_address
```

Start the backend server:
```bash
node index.js
```
The backend will run on `http://localhost:5000`.

### Frontend Setup
Navigate to the frontend directory:
```bash
cd ../frontend
```

Install dependencies:
```bash
npm install
```

Start the React development server:
```bash
npm start
```
The frontend will run on `http://localhost:3000`.

### Smart Contract Deployment
Navigate to the smart contract directory:
```bash
cd ../smart-contracts
```

Install Hardhat dependencies:
```bash
npm install --save-dev hardhat @nomiclabs/hardhat-ethers ethers dotenv
```

Configure `hardhat.config.js` for Ethereum or Binance Smart Chain (BSC):
```javascript
require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

module.exports = {
  solidity: "0.8.0",
  networks: {
    goerli: {
      url: `https://goerli.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
    bscTestnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
  },
};
```

Deploy the smart contract:
```bash
npx hardhat run scripts/deploy.js --network goerli
```
Save the deployed contract address in your `.env` file under `CONTRACT_ADDRESS`.

## Usage
- Open the frontend at `http://localhost:3000`.
- Connect your MetaMask wallet using the "Connect Wallet" button.
- Explore features like filtering products, adding items to the cart, and placing orders.
- Farmers can register their products via the dashboard.

## Revenue Model

### Transaction Commission
- 5% commission on every successful transaction between farmers and consumers.

### Subscription Plans
- Farmers pay ₹500/month for premium features like analytics and priority listings.

### Delivery Fees
- Dynamic delivery fees based on distance; FarmChain takes a 10% cut from delivery fees.

## Future Enhancements
- Implement tokenized farms (NFTs) for crowdfunding agricultural projects.
- Add AI-powered recommendations for consumers based on preferences and location.
- Expand to other blockchain networks like Polygon for lower gas fees.

## Contributors
- **Raj Kishore**
- **Pavimalini**
- **Guhasri**
- **Jeevan**

## License
This project is licensed under the MIT License - see the LICENSE file for details.
