const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  balance: { type: Number, default: 0 }, // total coins
  transactions: [
    {
      type: { type: String, enum: ["credit", "debit"], required: true },
      amount: { type: Number, required: true }, // coins added or used
      reason: { type: String }, // reel upload / purchase
      createdAt: { type: Date, default: Date.now }
    }
  ]
});

module.exports = mongoose.model("Wallet", walletSchema);