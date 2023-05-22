// models/hotel.js
const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  price:{
  type: Number,
  
  },
  rating: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('Hotel', hotelSchema);
