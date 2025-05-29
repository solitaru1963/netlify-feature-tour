const express = require('express');
const router = express.Router();

// Placeholder for payment integration
router.post('/create', (req, res) => {
  // Integrate with Coinbase Commerce or BitPay here
  res.json({ paymentUrl: 'https://commerce.coinbase.com/checkout/placeholder' });
});

module.exports = router;
