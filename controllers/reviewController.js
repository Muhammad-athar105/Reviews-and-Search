const Hotel = require('../models/hotel');
const Review = require('../models/review');

// Create a new review for a hotel
const createReview = async (req, res) => {
  try {
    const { hotelId } = req.params;
    const { rating, comment } = req.body;

    const hotel = await Hotel.findById(hotelId);

    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }

    const review = new Review({
      hotel: hotelId,
      rating,
      comment,
      
    });

    await review.save();

    // Calculate new average rating for the hotel
    const reviews = await Review.find({ hotel: hotelId });
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    hotel.rating = totalRating / reviews.length;
    await hotel.save();

    res.status(201).json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { createReview };
