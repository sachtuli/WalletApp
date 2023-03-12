const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Wallet = require('../../src/models/createWallet')
const Transaction = require('../../src/models/createTransaction')
const { v4: uuidv4 } = require('uuid');

const walletOneId = new mongoose.Types.ObjectId()
const walletOne = {
    _id: walletOneId,
    name: 'paytm',
    balance: 990,
    walletId: 'digi1',
    tokens: [{
        token: jwt.sign({ _id: walletOneId }, process.env.JWT_SECRET)
    }]
}

const walletTwoId = new mongoose.Types.ObjectId()
const walletTwo = {
    _id: walletTwoId,
    name: 'Savings Pot',
    balance: 1000,
    walletId: 'digi2',
    tokens: [{
        token: jwt.sign({ _id: walletTwoId }, process.env.JWT_SECRET)
    }]
}

const transactionOne = {
    _id: new mongoose.Types.ObjectId(),
    walletId: walletOne.walletId,
    amount: 100,
    reason: "Bonus",
    id: "uuid1"
}

const transactionTwo = {
    _id: new mongoose.Types.ObjectId(),
    walletId: walletOne.walletId,
    amount: 100,
    reason: "Cashback",
    id: "uuid2"
}

const transactionThree = {
    _id: new mongoose.Types.ObjectId(),
    walletId: walletOne.walletId,
    amount: -50,
    reason: "Grocery",
    id: "uuid3"
}

const setupDatabase = async () => {
    await Wallet.deleteMany()
    await Transaction.deleteMany()
    await new Wallet(walletOne).save()
    await new Wallet(walletTwo).save()
    await new Transaction(transactionOne).save()
    await new Transaction(transactionTwo).save()
    await new Transaction(transactionThree).save()
}

module.exports = {
    walletOneId,
    walletOne,
    walletTwoId,
    walletTwo,
    transactionOne,
    transactionTwo,
    transactionThree,
    setupDatabase
}
