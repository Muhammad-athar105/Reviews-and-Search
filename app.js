// app.js
const express = require('express');
const connectDB = require('./config/db');
const hotelRoutes = require('./routes/hotelRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api', hotelRoutes);
app.use('/api', reviewRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
