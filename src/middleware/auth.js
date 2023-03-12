const Wallet = require('../models/createWallet')
const jwt = require('jsonwebtoken')

/* Middleware Function that runs between requests and handler */

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const wallet = await Wallet.findOne({ _id: decoded._id, 'tokens.token': token })

    if (!wallet) {
      throw new Error({message: 'Wallet not Found'})
    }
    else {
    req.token = token
    req.wallet = wallet // storing the above result so that code doesn't need to find that again
    next()
    }
  } catch (err) {
    return res.status(404).json({message: err.message})
  }
}

module.exports = auth
