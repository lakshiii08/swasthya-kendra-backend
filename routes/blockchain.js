const express = require("express");

const router = express.Router();

const blockchainService =
  require("../services/blockchainService");

router.post("/store", async (req, res) => {

  try {

    const {
      walletAddress,
      chatContent,
      recordData,
    } = req.body;

    const result =
      await blockchainService.storeRecord(
        walletAddress,
        chatContent,
        recordData
      );

    res.json(result);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;