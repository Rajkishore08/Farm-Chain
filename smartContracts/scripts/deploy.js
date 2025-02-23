const hre = require("hardhat");

async function main() {
  const FarmChainContractFactory = await hre.ethers.getContractFactory("FarmChain");
  const farmchainContractInstance = await FarmChainContractFactory.deploy();
  await farmchainContractInstance.deployed();

  console.log(`Deployed at ${farmchainContractInstance.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});