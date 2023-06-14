// Better Privete Key Management
import { ethers } from "ethers"
import * as fs from "fs"
import "dotenv/config"

// Run "history -c" to clear history after you encrypted the key

// .env is a way to save private keys, we don't want to just letting those keys to hanging around in .env file
async function main() {
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!);
  const encryptedJsonKey = await wallet.encrypt(
    process.env.PRIVATE_KEY_PASSWORD!,
    process.env.PRIVATE_KEY!
  );
  fs.writeFileSync("./.encryptedKey.json", encryptedJsonKey);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
