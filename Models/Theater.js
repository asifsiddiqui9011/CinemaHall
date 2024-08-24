const mongoose = require("mongoose");

const seatSchema = {
  isBooked: { type: Boolean, default: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  movieMainId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
    default: null,
  },
  date: { type: Date, default: null },
  seatNumber: { type: Number, required: true },
};

const screenSchema = new mongoose.Schema({
  name: String,
  mainId: String,
  location: String,
  capacity: Number,
  screenType: String,
  numberOfBookings: { type: Number, default: 0 },
  available: { type: Boolean, default: true },
  slots: {
    slot1: {
      type: Array,
      default: function () {
        return Array.from({ length: this.capacity }, (_, index) => ({
          isBooked: false,
          seatNumber: index + 1,
          userId: null,
          movieMainId: null,
          date: null,
        }));
      },
    },
    slot2: {
      type: Array,
      default: function () {
        return Array.from({ length: this.capacity }, (_, index) => ({
          isBooked: false,
          seatNumber: index + 1,
          userId: null,
          movieMainId: null,
          date: null,
        }));
      },
    },
    slot3: {
      type: Array,
      default: function () {
        return Array.from({ length: this.capacity }, (_, index) => ({
          isBooked: false,
          seatNumber: index + 1,
          userId: null,
          movieMainId: null,
          date: null,
        }));
      },
    },
  },
  // New field added for arrays `n`, `p`, and `d`
  booleanArrays: {
    n: { type: [Boolean], default: [] }, // Array of booleans
    p: { type: [Boolean], default: [] }, // Array of booleans
    d: { type: [Boolean], default: [] }, // Array of booleans
  },
});

module.exports = mongoose.model("Screen", screenSchema);
