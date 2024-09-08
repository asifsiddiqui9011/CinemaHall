// const mongoose = require("mongoose");

// const ticketSchema = new mongoose.Schema({
//   user_id: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   screenId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Screen",
//     required: true,
//   },
//   seats_booked: { type: Number, required: true },
//   total_price: { type: Number, required: true },
//   booking_time: { type: Date, default: Date.now },
//   created_at: { type: Date, default: Date.now },
//   cancellation: { type: Boolean, default: false },
//   number_of_person: { type: Number, required: true },
// });

// module.exports = mongoose.model("Ticket", ticketSchema);
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
  slotId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "slot",
    required: true,
  },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
    required: true,
  },
  location:{type:String},
  seats:{type:String,require:true},
  total_seats_booked: { type:Number, required: true  },
  totalPrice: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  created_at: { type: Date, default: Date.now },
  cancellation: { type: Boolean, default: false },
  // number_of_person: { type: Number, required: true },
});

module.exports = mongoose.model("Ticket", ticketSchema);
