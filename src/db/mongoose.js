const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const connectionURL = process.env.MONGODB_URL
mongoose.set('strictQuery', true)
mongoose.connect(connectionURL, { useNewUrlParser: true })
