const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const connectDB = require('./config/db')

// Load env
dotenv.config()

// Connect to database
connectDB()

const app = express()

// Body parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// ======================
// ✅ API ROUTES
// ======================
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))

// ======================
// ✅ DEPLOYMENT (Render)
// ======================
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, '../frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running...')
  })
}

// ======================
// ✅ START SERVER
// ======================
const PORT = process.env.PORT || 5000

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
)