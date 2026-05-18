const path = require('path')
const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const cors = require('cors')

const app = express()

const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes
app.use('/api/users', require('./routes/userRoutes'))

// Test route
app.get('/', (req, res) => {
  res.send('Backend is working 🚀')
})

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})