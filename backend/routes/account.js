// backend/routes/account.js

const express = require("express");
const { authMiddleware } = require("../middleware");
const { Account } = require("../db");

const router = express.Router();

// GET /api/v1/account/balance  (same as yours)
router.get("/balance", authMiddleware, async (req, res) => {
  try {
    const account = await Account.findOne({ userId: req.userId });

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    res.json({ balance: account.balance });
  } catch (e) {
    console.error("Balance error:", e);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ✅ POST /api/v1/account/transfer  (fixed, no transactions)
router.post("/transfer", authMiddleware, async (req, res) => {
  try {
    let { amount, to } = req.body;
    const amountNum = Number(amount);

    // validation
    if (!amountNum || amountNum <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    if (!to) {
      return res.status(400).json({ message: "Recipient (to) is required" });
    }

    // sender
    const fromAccount = await Account.findOne({ userId: req.userId });
    if (!fromAccount) {
      return res.status(400).json({ message: "Sender account not found" });
    }

    if (fromAccount.balance < amountNum) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    // receiver
    const toAccount = await Account.findOne({ userId: to });
    if (!toAccount) {
      return res.status(400).json({ message: "Invalid receiver account" });
    }

    // update balances
    fromAccount.balance -= amountNum;
    toAccount.balance += amountNum;

    await fromAccount.save();
    await toAccount.save();

    res.json({ message: "Transfer successful" });
  } catch (e) {
    console.error("Transfer error:", e);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
