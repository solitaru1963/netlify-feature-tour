const express = require('express');
const router = express.Router();

// Placeholder for mining pool integration
router.get('/stats', (req, res) => {
  // Integrate with mining pool API here
  res.json({ poolHashrate: 100, userHashrate: 1.5 });
});

module.exports = router;
