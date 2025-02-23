const express = require("express");
const { ethers } = require("ethers");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
require("dotenv").config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Ensure .env variables are set
if (!process.env.BLOCKCHAIN_RPC_URL) {
    console.error("Error: BLOCKCHAIN_RPC_URL is missing in .env");
    process.exit(1);
}
if (!process.env.PRIVATE_KEY) {
    console.error("Error: PRIVATE_KEY is missing in .env");
    process.exit(1);
}
if (!process.env.CONTRACT_ADDRESS) {
    console.error("Error: CONTRACT_ADDRESS is missing in .env");
    process.exit(1);
}

// Initialize ethers.js provider
const provider = new ethers.JsonRpcProvider(process.env.BLOCKCHAIN_RPC_URL);

// Load contract ABI & address
const contractAddress = process.env.CONTRACT_ADDRESS;
const contractPath = path.join(__dirname, "FarmChainABI.json");

if (!fs.existsSync(contractPath)) {
    console.error("Error: FarmChainABI.json not found!");
    process.exit(1);
}

let contractJSON;  // Declare outside try-catch
try {
    const data = fs.readFileSync(contractPath, 'utf8');
    contractJSON = JSON.parse(data);
} catch (error) {
    console.error("Error reading/parsing FarmChainABI.json:", error);
    process.exit(1);
}

const contractABI = contractJSON.abi;
const contract = new ethers.Contract(contractAddress, contractABI, provider); // Read-only instance

app.use(express.json());
app.use(cors());

// Function to get signer for sending transactions (Admin Account)
const getSigner = async () => {
    try {
        const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
        return wallet;
    } catch (error) {
        console.error("Error getting signer:", error);
        throw error;
    }
};

// Function to register Farmer
app.post("/registerFarmer", async (req, res) => {
    try {
        const { name, location, latitude, longitude } = req.body;
        if (!name || !location || !latitude || !longitude) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const signer = await getSigner();
        const contractWithSigner = new ethers.Contract(contractAddress, contractABI, signer); // Create new instance with signer
        const latInt = Math.round(parseFloat(latitude) * 1e6);
        const longInt = Math.round(parseFloat(longitude) * 1e6);

        const tx = await contractWithSigner.registerFarmer(name, location, latInt, longInt);
        const receipt = await tx.wait(); // Wait for transaction receipt

        res.json({ success: true, transactionHash: receipt.hash });
    } catch (error) {
        console.error("Error in /registerFarmer:", error);
        res.status(500).json({ error: error.message });
    }
});

// Function to register Consumer
app.post("/registerConsumer", async (req, res) => {
    try {
        const { name, location, latitude, longitude } = req.body;
        if (!name || !location || !latitude || !longitude) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const signer = await getSigner();
        const contractWithSigner = new ethers.Contract(contractAddress, contractABI, signer);  // Create new instance with signer
        const latInt = Math.round(parseFloat(latitude) * 1e6);
        const longInt = Math.round(parseFloat(longitude) * 1e6);

        const tx = await contractWithSigner.registerConsumer(name, location, latInt, longInt);
        const receipt = await tx.wait();

        res.json({ success: true, transactionHash: receipt.hash });
    } catch (error) {
        console.error("Error in /registerConsumer:", error);
        res.status(500).json({ error: error.message });
    }
});

// Function to register Product
app.post("/registerProduct", async (req, res) => {
    try {
        const { name, basePrice, description, location, deliveryRange } = req.body;
        if (!name || !basePrice || !description || !location || !deliveryRange) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const signer = await getSigner();
        const contractWithSigner = new ethers.Contract(contractAddress, contractABI, signer);  // Create new instance with signer

        const tx = await contractWithSigner.registerProduct(name, basePrice, description, location, deliveryRange);
        const receipt = await tx.wait();

        res.json({ success: true, transactionHash: receipt.hash });
    } catch (error) {
        console.error("Error in /registerProduct:", error);
        res.status(500).json({ error: error.message });
    }
});

// Function to Buy Product (Users Pay with ETH)
app.post("/buyProduct", async (req, res) => {
    try {
        const { productId, value } = req.body;
        if (!productId || !value) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const signer = await getSigner();
        const contractWithSigner = new ethers.Contract(contractAddress, contractABI, signer);

        const tx = await contractWithSigner.buyProduct(productId, {
            value: ethers.parseUnits(value, "ether"),
        });
        const receipt = await tx.wait();
        res.json({ success: true, transactionHash: receipt.hash });
    } catch (error) {
        console.error("Error in /buyProduct:", error);
        res.status(500).json({ error: error.message });
    }
});

// AgriMarket Data (Example Route)
app.get("/agriMarketData", async (req, res) => {
    const apiKey = process.env.AGRI_API_KEY || 'YOUR_DEFAULT_API_KEY';
    const apiUrl = `https://api.data.gov.in/resource/35985678-0d79-46b4-9ed6-6f13308a1d24?api-key=${apiKey}&format=json`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            console.error("API response status:", response.status);
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        res.json(data.records);  // Send only the 'records' part

    } catch (error) {
        console.error("Error fetching AgriMarket data:", error);
        res.status(500).json({ error: "Error fetching AgriMarket data" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});