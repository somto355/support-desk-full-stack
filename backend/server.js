require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Test Route
app.get('/', (req, res) => {
  res.send('Backend is working 🚀');
});

// Routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// START SERVER (always LAST)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});