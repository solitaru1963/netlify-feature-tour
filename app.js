const express = require('express');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/user');
const paymentRoutes = require('./routes/payment');
const miningRoutes = require('./routes/mining');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/mining', miningRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
