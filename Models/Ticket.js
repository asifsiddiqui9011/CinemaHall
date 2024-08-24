const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  screenId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Screen",
    required: true,
  },
  seats_booked: { type: Number, required: true },
  total_price: { type: Number, required: true },
  booking_time: { type: Date, default: Date.now },
  created_at: { type: Date, default: Date.now },
  cancellation: { type: Boolean, default: false },
  number_of_person: { type: Number, required: true },
});

module.exports = mongoose.model("Ticket", ticketSchema);
