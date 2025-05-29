const express = require('express');
const router = express.Router();

// Dummy user registration/login
router.post('/register', (req, res) => {
  // Add user registration logic here
  res.json({ message: 'User registered (placeholder)' });
});

router.post('/login', (req, res) => {
  // Add user login logic here
  res.json({ token: 'dummy-jwt-token' });
});

router.get('/stats', (req, res) => {
  // Fetch user mining stats (placeholder)
  res.json({ hashrate: 1.5, balance: 0.002 });
});

module.exports = router;
