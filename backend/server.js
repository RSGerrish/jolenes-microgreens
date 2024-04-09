require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const maillistRoutes = require('./routes/maillist')
const { itemRouter } = require('./routes/items')

// express app
const expapp = express()

// middleware
expapp.use(cors({origin: 'http://localhost:5173'}))
expapp.use(express.json())

expapp.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
expapp.use('/api/maillist', maillistRoutes)
expapp.use('/api/items', itemRouter)

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    expapp.listen(process.env.PORT, () => {
      console.log('listening on port ' + process.env.PORT + '...')
    })
  })
  .catch((error) => {
    console.log(error)
  })