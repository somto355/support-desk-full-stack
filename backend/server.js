const express = require('express')
require('dotenv').config()
const connectDB = require('./config/db')
const { errorHandler } = require('./middleware/errorMiddleware')

const app = express()

// Connect to DB
connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Backend is working' })
})

// Routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))

// Error handler
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})