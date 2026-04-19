const express = require('express');
const router = express.Router();

// Controllers
const {
  registerUser,
  loginUser
} = require('../controllers/userController');

// Middleware
const { protect } = require('../middleware/authMiddleware');


// =========================
// @desc    Register user
// @route   POST /api/users/register
// =========================
router.post('/register', registerUser);


// =========================
// @desc    Login user
// @route   POST /api/users/login
// =========================
router.post('/login', loginUser);


// =========================
// @desc    Get current user
// @route   GET /api/users/me
// =========================
router.get('/me', protect, (req, res) => {
  res.status(200).json(req.user);
});


module.exports = router;

