const express = require('express')
const router = express.Router()

// Controllers
const {
  registerUser,
  loginUser,
  getMe,
} = require('../controllers/userController')

// Middleware
const { protect } = require('../middleware/authMiddleware')

// ======================
// ROUTES
// ======================

// Register user
router.post('/', registerUser)

// Login user
router.post('/login', loginUser)

// Get current logged-in user
router.get('/me', protect, getMe)

module.exports = router