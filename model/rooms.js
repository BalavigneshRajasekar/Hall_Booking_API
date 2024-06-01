const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomName: {
    type: String,
    required: true,
  },

  numberOfSeats: {
    type: Number,
    required: true,
  },
  amenities: {
    type: String,
    required: true,
  },
  priceFor1Hour: {
    type: Number,
    required: true,
  },
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
