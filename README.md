# ether-simplestorage-exercise
Run a project:
```bash
PRIVATE_KEY_PASSWORD=???????? node deploy.js
```



## Lesson
 1. [ Private Key Management ](https://github.com/yanisapths/ether-simplestorage-exercise/README.md#private-key-management)

### 1. Private Key Management
  1. save you keys in .env 
  2. create encryptKey.js
  
     ```Solidity
         const wallet = new ethers.Wallet(process.env.PRIVATE_KEY);
         const encryptedJsonKey = await wallet.encrypt(
                process.env.PRIVATE_KEY_PASSWORD,
                process.env.PRIVATE_KEY
            );
            fs.writeFileSync("./.encryptedKey.json", encryptedJsonKey);
     ```
 
   3. `node encryptKey.json`
   4. `history -c`
      <sub>To clear history after you encrypted the key</sub>

  #### To use key:
  ```Solidity
   const encryptedJson = fs.readFileSync("./.encryptedKey.json", "utf8");
      let wallet = new ethers.Wallet.fromEncryptedJsonSync(
        encryptedJson,
        process.env.PRIVATE_KEY_PASSWORD
      );
    wallet = await wallet.connect(provider);
   ```
