const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Secret key for JWT, make sure to store this in an environment variable in production
const JWT_SECRET = process.env.JWT_SECRET || "Movie_ticket";

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, location, phone, age } = req.body;

    // Check for missing required fields
    if (!name || !email || !password || !phone) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      location,
      phone,
      age,
    });
    

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });
    const savedUser = await user.save();
    res.status(201).json({
      success:true,
      token,
      user:{...savedUser},
    });
  } catch (error) {
    console.error("Error creating user:", error); // Log the error details
    res.status(500).json({
      message: "Error creating user",
      error: error.message || error,
    });
  }
};

// User login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Create a JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      success:true,
      token,
      user: { id: user._id, email: user.email, name: user.name },
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({
      message: "Error logging in user",
      error: error.message || error,
    });
  }
};

// Middleware to authenticate JWT token

// Get all users (protected route)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error retrieving users:", error); // Log the error details
    res.status(500).json({
      message: "Error retrieving users",
      error: error.message || error,
    });
  }
};

// Get a user by ID (protected route)
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error retrieving user:", error); // Log the error details
    res.status(500).json({
      message: "Error retrieving user",
      error: error.message || error,
    });
  }
};

// Update a user by ID (protected route)
exports.updateUser = async (req, res) => {
  try {
    const { name, email, password, location, phone, age } = req.body;

    // Hash the password if it's being updated
    const updateData = {
      name,
      email,
      location,
      phone,
      age,
    };

    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error); // Log the error details
    res.status(500).json({
      message: "Error updating user",
      error: error.message || error,
    });
  }
};

// Delete a user by ID (protected route)
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error); // Log the error details
    res.status(500).json({
      message: "Error deleting user",
      error: error.message || error,
    });
  }
};
