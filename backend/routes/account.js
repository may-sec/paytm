const express = require('express');
const { authMiddleware } = require('../middleware');
const { Account, Transaction } = require('../db');
const { default: mongoose } = require('mongoose');

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    });

    res.json({
        balance: account.balance
    })
});

router.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;

    // Fetch the accounts within the transaction
    const account = await Account.findOne({ userId: req.userId }).session(session);

    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    // Perform the transfer
    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

    // Save transaction record
    await Transaction.create([{
        from: req.userId,
        to: to,
        amount: amount
    }], { session });

    // Commit the transaction
    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });
});

// Get transactions endpoint
router.get("/transactions", authMiddleware, async (req, res) => {
    try {
        const transactions = await Transaction.find({
            $or: [
                { from: req.userId },
                { to: req.userId }
            ]
        })
        .populate('from', 'firstName lastName username')
        .populate('to', 'firstName lastName username')
        .sort({ createdAt: -1 })
        .limit(50);

        const formattedTransactions = transactions.map(txn => ({
            id: txn._id,
            type: txn.from._id.toString() === req.userId ? "sent" : "received",
            amount: txn.amount,
            to: txn.to ? `${txn.to.firstName} ${txn.to.lastName}` : "Unknown",
            from: txn.from ? `${txn.from.firstName} ${txn.from.lastName}` : "Unknown",
            toUsername: txn.to?.username,
            fromUsername: txn.from?.username,
            date: txn.createdAt.toISOString().split('T')[0],
            timestamp: txn.createdAt
        }));

        res.json({
            transactions: formattedTransactions
        });
    } catch (error) {
        console.error("Error fetching transactions:", error);
        res.status(500).json({
            message: "Error fetching transactions"
        });
    }
});

module.exports = router;