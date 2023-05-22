const Hotel = require('../models/hotel');


// Create a new hotel
const createHotel = async (req, res) => {
  try {
    const { name, address, price } = req.body;
    const existingHotel = await Hotel.findOne({ $or: [{ name },] });
    
    if (existingHotel) {
      return res.status(409).json({ message: 'Hotel already exists' });
    }

    const hotel = new Hotel({
      name,
      address,
      price
    });
    await hotel.save();
    res.status(201).json(hotel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Rest of the code remains the same...


// Get all hotels
const getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get top-rated hotels
const getTopRatedHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find().sort({ rating: -1 }).limit(10);
    res.json(hotels);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


// Search hotels by name and location
const searchHotels = async (req, res) => {
  try {
    const { name, address } = req.query;
    const query = {};

    if (name) {
      query.name = { $regex: name, $options: 'i' };
    }

    if (address) {
      query.address = { $regex: address, $options: 'i' };
    }

    const hotels = await Hotel.find(query);

    if (hotels.length === 0) {
      return res.status(404).json({ message: 'Hotel not found' });
    }

    res.json(hotels);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { createHotel, getAllHotels, getTopRatedHotels, searchHotels };
