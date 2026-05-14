const { ethers } = require("ethers");
const CryptoJS = require("crypto-js");
require("dotenv").config();

const abi =
  require("../abis/MedicalRecords.json").abi;

class BlockchainService {

  constructor() {

    this.provider =
      new ethers.JsonRpcProvider(
        process.env.SEPOLIA_RPC_URL
      );

    this.wallet =
      new ethers.Wallet(
        process.env.PRIVATE_KEY,
        this.provider
      );

    this.contract =
      new ethers.Contract(
        process.env.CONTRACT_ADDRESS,
        abi,
        this.wallet
      );
  }

  generateHash(data) {

    return CryptoJS.SHA256(
      JSON.stringify(data)
    ).toString();
  }

  async storeRecord(
    walletAddress,
    chatContent,
    recordData
  ) {

    try {

      const chatHash =
        this.generateHash(chatContent);

      const recordHash =
        this.generateHash(recordData);

      const recordId =
        ethers.keccak256(
          ethers.toUtf8Bytes(
            chatHash + walletAddress
          )
        );

      const tx =
        await this.contract.addRecord(
          recordId,
          chatHash,
          recordHash
        );

      const receipt =
        await tx.wait();

      return {
        success: true,
        transactionHash: receipt.hash,
        blockNumber: receipt.blockNumber,
        recordId,
        chatHash,
        recordHash,
      };

    } catch (error) {

      console.log(error);

      throw new Error(
        "Blockchain storage failed"
      );
    }
  }
}

module.exports =
  new BlockchainService();