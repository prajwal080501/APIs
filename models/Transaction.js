const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "New Transaction"
    },
    type: {
        type: String,
        default: "expense"
    },
    amount: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const Transaction = mongoose.model("Transaction", TransactionSchema);

module.exports = Transaction;