// server.js

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
const port = process.env.PORT || 5000

require('dotenv').config()

app.use(cors())
app.use(express.json())
const uri = process.env.ATLAS_URI
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })

const connection = mongoose.connection
connection.once('open', () => {
  console.log('MongoDB database connection established successfully')
})

const contactsRouter = require('./routes/contacts')
app.use('/contacts', contactsRouter)

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})
