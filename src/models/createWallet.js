const mongoose = require('mongoose')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
const Transaction = require('./createTransaction')

dotenv.config()

const walletSchema = new mongoose.Schema({
    walletId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        default: 0,
        required: true,
    },
    transactions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction'
    }],
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
},
{ timestamps: true })


walletSchema.methods.toJSON = function () {
    // this method internally calls JSON.stringify . Express by default will run this method
    const wallet = this
    const walletObj = wallet.toObject()
    const rounded_balance = Number(Math.round(Number(`${walletObj.balance}e${2}`)) + `e-${2}`)
    walletObj.balance = rounded_balance

    delete walletObj.updatedAt
    delete walletObj.__v
    delete walletObj._id
    delete walletObj.transactions
    delete walletObj.tokens

    return walletObj
}

walletSchema.methods.generateAuthToken = async function () {
    const wallet = this
    const token = jwt.sign({ _id: wallet._id.toString() }, process.env.JWT_SECRET)
    wallet.tokens = wallet.tokens.concat({ token })
    await wallet.save()
    return token
}

const Wallet = mongoose.model('Wallet', walletSchema)

module.exports = Wallet
