const express = require('express')
const { createWallet, fetchWalletById } = require('../controllers/walletController')
const { createTransaction, fetchTransactionsForWallet } = require('../controllers/transactionController')
const { body } = require('express-validator');

const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/wallet', body('name').isString(),
    body('balance').isNumeric(), createWallet)

router.get('/wallet/:walletId', auth, fetchWalletById)

router.post('/wallet/:walletId/transactions', auth, body('amount').isNumeric(),
    body('reason').isString(), createTransaction)

router.get('/wallet/:walletId/transactions', auth, fetchTransactionsForWallet)

module.exports = router
