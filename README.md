# 🚀 FarmChain - Revolutionizing Agriculture with Blockchain

FarmChain is a cutting-edge blockchain-based platform that bridges the gap between farmers and consumers, eliminating middlemen to ensure **fair pricing, product authenticity, and complete transparency** in the agricultural supply chain. 

## 🌟 Features

### 👨‍🌾 User Roles
#### ✅ Farmers:
- Register and list their products with pricing, location, and delivery range.
- Track sales, manage inventory, and receive direct payments.

#### 🛒 Consumers:
- Browse & purchase farm-fresh products with filters for type, price, and location.
- Order directly from nearby farmers and track previous purchases.

### 🔑 Key Functionalities
- **🔗 Connect Wallet:** Securely link your MetaMask wallet for seamless transactions.
- **🛍️ Smart Filters:** Search by product type (e.g., fruits, vegetables), price range, and location.
- **📦 Cart & Orders:** Add products to the cart, adjust quantities, and view past orders.
- **🔎 Traceability:** Track the journey of a product from farm to table using blockchain.

### 🔗 Blockchain Integration
- Built on **Ethereum** & **Binance Smart Chain (BSC)** for secure, transparent transactions.
- Smart contracts power **farmer registration, product listings, orders, and payments**.

### 📍 Geographic Prioritization
- Products are shown based on proximity to consumers.
- Dynamic delivery fee calculations based on location.

## 🏗️ Technology Stack

### 🖥️ Frontend
- **React.js** – Dynamic, responsive UI.
- **Bootstrap** – Sleek, modern design.

### 🛠️ Backend
- **Node.js & Express.js** – RESTful API for smooth operations.
- **MongoDB** – Secure storage of user profiles, products, and orders.

### 🔥 Blockchain
- **Ethereum / BSC** – For decentralized transactions.
- **Solidity Smart Contracts** – Powering trustless interactions.

### 🔑 Wallet Integration
- **MetaMask & WalletConnect** – Ensuring secure user interactions.

## 🚀 Installation Guide

### 📌 Prerequisites
Ensure you have the following installed:
- **Node.js** (v16+)
- **MongoDB** (Local/Cloud)
- **MetaMask** browser extension

### 🔧 Backend Setup
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
Backend runs at `http://localhost:5000`.

### 🎨 Frontend Setup
```bash
cd ../frontend
npm install
npm start
```
Frontend runs at `http://localhost:3000`.

### ⛓️ Smart Contract Deployment
```bash
cd ../smart-contracts
npm install --save-dev hardhat @nomiclabs/hardhat-ethers ethers dotenv
```
Configure `hardhat.config.js`:
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
Save the deployed contract address in `.env`.

## 📸 Screenshots
### 🌍 Marketplace Page
![Marketplace Screenshot](screenshots/marketplace.png)

### 🛒 Product Listings
![Product Listings](screenshots/product-listing.png)

## 💰 Revenue Model

### 🔹 Transaction Commission
- **5% commission** on successful transactions.

### 🔹 Subscription Plans
- **₹500/month** for farmers to access premium features like analytics and priority listings.

### 🔹 Delivery Fees
- **Dynamic** fees based on distance, with FarmChain taking a **10% cut**.

## 🚀 Future Enhancements
- **NFT-based Tokenized Farms** for crowdfunding agricultural projects.
- **AI-powered recommendations** based on consumer preferences & location.
- **Polygon integration** for lower gas fees.

## 🛠️ Contributors
- **Raj Kishore**
- **Pavimalini**
- **Guhasri**
- **Jeevan**


## 📜 License
This project is licensed under the **MIT License**. See `LICENSE` for details.

---

💡 *Empowering Farmers. Connecting Communities. Transforming Agriculture with Blockchain.*
