const express = require('express')

require('./db/mongoose.js')

const walletRouter = require('./routers/wallet')
const app = express()

app.use(express.json())

app.use(walletRouter)

module.exports = app
