const express = require('express');
const router = express.Router();
const { createReview } = require('../controllers/reviewController');

// Create a new review for a hotel
router.post('/hotels/:hotelId/reviews', createReview);

module.exports = router;
