const ethers = require("ethers");
const fs = require("fs");
require("dotenv").config();
// Run "history -c" to clear history after you encrypted the key
// Using encrypted key:  run on terminal with
// PRIVATE_KEY_PASSWORD=???????? node deploy.js
async function main() {
  const encryptedJson = fs.readFileSync("./.encryptedKey.json", "utf8");

  // -------------------------SET UP-----------------------------------------------
  // 1. Connect to Ganache instances
  // If using WSL, to get URL; go to setting > server > select HOSTNAME: VEther(WSL)
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL //RPC SERVER ON GANACHE
  );
  // 2. Connect to a wallet
  // You can just use: const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  // But to be more secure:
  let wallet = new ethers.Wallet.fromEncryptedJsonSync(
    encryptedJson,
    process.env.PRIVATE_KEY_PASSWORD
  );
  wallet = await wallet.connect(provider);
  // 3. Grab abi and binary of our contract
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );
  // 4. Connect abi, binary to new ContractFactory object with wallet, so that wallet be the one to actually deploy the contract
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying, please wait...⌛");
  // 5. Deploy the contract
  const contract = await contractFactory.deploy();
  // 6. Wait for one blok confirmation for a receipt
  const contractReceipt = await contract.deployTransaction.wait(1); // wait for block confirmation to get receipts
  // -----------------------------------------------------------------------------
  // Get number
  const currentFavoriteNumber = await contract.retrieve();
  console.log(`Current Favorite Number: ${currentFavoriteNumber.toString()}`);
  const transactionResponse = await contract.store("5");
  const transactionReceipt = await transactionResponse.wait(1);
  const updatedFavoriteNumber = await contract.retrieve();
  console.log(`Updated favorite umber: ${updatedFavoriteNumber}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
