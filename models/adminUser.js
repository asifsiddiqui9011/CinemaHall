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
      // Email format validation
      },
      role: {
        type: String,
        required: true,
        enum: ["admin", "superadmin", "theater_owner"], // Role can be 'admin', 'superadmin', or 'theater owner'
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
