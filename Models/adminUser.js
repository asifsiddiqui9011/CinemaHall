const mongoose = require("mongoose");

const adminuserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, // Email format validation
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // Minimum length for password
    },
    phoneNumber: {
      type: String,
      required: true,
      match: /^\d{10}$/, // Assumes a 10-digit phone number format
    },
    location: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("adminUser", adminuserSchema);
