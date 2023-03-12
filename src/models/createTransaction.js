const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const transactionSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        enum: ['debit', 'credit'],

    },
    walletId: {
        type: String,
        required: true,
        ref: 'Wallet'
    },
    reason: {
        type: String,
        required: true
    },
    id: {
        type: String,
        unique: true
    },
    balance: {
        type: Number,
        ref: 'Wallet'
    },
},
{ timestamps: true })


transactionSchema.methods.toJSON = function () {
    // this method internally calls JSON.stringify . Express by default will run this method
    const transaction = this
    const transObj = transaction.toObject()

    delete transObj.updatedAt
    delete transObj.__v
    delete transObj._id
    delete transObj.type
    delete transObj.reason

    return transObj
}
const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction
