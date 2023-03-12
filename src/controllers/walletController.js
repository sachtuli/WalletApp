const Wallet = require('../models/createWallet')
const ShortUniqueId = require('short-unique-id');
const { validationResult } = require('express-validator');

module.exports.createWallet = async function createWallet(req, res) {
  const walletId = new ShortUniqueId({ length: 8 });

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Invalid request body supplied',
      errors: errors.array()
    });
}

  let name = req.body.name;
  let balance = req.body.balance;
  try {
    const wallet = new Wallet({ walletId: walletId(), name: name, balance: balance })
    const savedWallet = await wallet.save()
    const token = await wallet.generateAuthToken()
    res.cookie('authToken', token, { httpOnly: true, secure: true });
    res.status(201).json({ message: 'Wallet has been created', data: savedWallet })
  }
  catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json({ message: 'Invalid request body supplied' });
    } else {
      res.status(500).json({ message: 'An internal server error occurred' });
    }
  }
}

module.exports.fetchWalletById = async function fetchWalletById(req, res) {
  const walletId = req.params.walletId
  try {
    const wallet = await Wallet.findOne({ walletId: walletId }).exec()
    if (!wallet)
      res.status(404).json('Wallet not found')
    else {
      res.status(200).json({ message: 'The wallet was fetched successfully', data: wallet })
    }
  }
  catch (err) {
    if (err.name === 'MongoError' && err.code === 11000) {
      res.status(404).json({ message: 'Wallet not found' });
    } else {
      res.status(500).json({ message: 'An internal server error occurred' });
    }
  }
}
