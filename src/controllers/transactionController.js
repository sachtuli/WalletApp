const Transaction = require('../models/createTransaction')
const Wallet = require('../models/createWallet')
const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');

module.exports.createTransaction = async function createTransaction(req, res) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Invalid request body supplied',
        errors: errors.array()
      });
  }

    try {
        const walletId = req.params.walletId;
        const wallet = await Wallet.findOne({ walletId: walletId });
        if (req.body.amount && req.body.amount > 0) {
            wallet.balance += Number(req.body.amount)
            const credit_transaction = new Transaction({
                amount: req.body.amount,
                type: 'credit',
                walletId: walletId,
                balance: wallet.balance,
                reason: req.body.reason,
                id: uuidv4()
            });
            const result = await credit_transaction.save()
            await wallet.save()
            res.status(201).send({ message: 'Transaction has been created', data: result })
        }

        if (req.body.amount && req.body.amount < 0) {
            wallet.balance = wallet.balance - Math.abs(req.body.amount)
            const debit_transaction = new Transaction({
                amount: req.body.amount,
                type: 'debit',
                walletId: walletId,
                balance: wallet.balance,
                reason: req.body.reason,
                id: uuidv4()
            });
            const result = await debit_transaction.save()
            await wallet.save()
            res.status(201).send({ message: 'Transaction has been created', data: result })
        }

    } catch (err) {
        if (err.name === 'ValidationError') {
            res.status(400).send({ message: 'Invalid request body supplied' });
        } else if (err.name === 'MongoError' && err.code === 11000) {
            res.status(404).send({ error: 'Wallet not found' });
        } else {
            res.status(500).send({ message: 'An internal server error occurred' });
        }
    }
}


module.exports.fetchTransactionsForWallet = async function fetchTransactionsForWallet(req, res) {
    try {
        const walletId = req.params.walletId
        const wallet = await Wallet.findOne({ walletId: walletId }).exec()
        if (!wallet)
            res.status(404).json('Wallet not found')
        else{
        const transactions = await Transaction.find({ walletId: walletId });
            res.status(200).send({ message: 'The transactions have been successfully fetched for the wallet.', data: transactions })
        }

    } catch (err) {
        if (err.name === 'MongoError' && err.code === 11000) {
            res.status(404).send({ error: 'Wallet not found' });
        } else {
            res.status(500).send({ message: 'An internal server error occurred' });
        }
    }
}
