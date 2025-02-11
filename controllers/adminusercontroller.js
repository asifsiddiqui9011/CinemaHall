const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const adminUser = require("../models/adminUser.js");

const JWT_SECRET = process.env.JWT_ADMINSECRETKEY;

// Signup Controller
exports.signup = async (req, res) => {
  const { username, email, password, phoneNumber, location, role } = req.body;

  try {
    const existingUser = await adminUser.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new adminUser({
      username,
      email,
      password: hashedPassword,
      phoneNumber,
      location,
      role
    });

    await newUser.save();

    const token = jwt.sign({ userId: newUser._id , role: newUser.role }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({success:true, token, userId: newUser._id });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
    console.log(error);
  }
};

// Login Controller
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await adminUser.findOne({ email});
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id,role: user.role }, JWT_SECRET, {
      expiresIn: "3h",
    });

    res.status(200).json({success:true, token, user:{email:user.email, phoneNumber:user. phoneNumber,username:user.username ,id:user._id} });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

//get user by id
exports.getUser = async (req, res) => {
  try {

    const user = await adminUser.findById(req.user.userId); 

    if (!user) return res.status(404).json({ message: 'User not found' });
    
    res.status(200).json({success:true,user:{email:user.email,phoneNumber:user.phoneNumber,username:user.username,role:user.role}});
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};


// Get All Admin Users
exports.getAllAdminUsers = async (req, res) => {
  try {
    const users = await adminUser.find({role:"admin"});
    res.status(200).json({success:true, data: users });
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
};


//get all thater owners 
exports.getAllTheaterOwners = async (req, res) => {
  try {
    const users = await adminUser.find({role:"theater_owner"});
    res.status(200).json({success:true, thaterOwners: users });
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
};


// Update Admin User by ID
exports.updateAdminUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Ensure password is not updated directly for security reasons
    if (updates.password) {
      return res.status(400).json({ message: "Password cannot be updated via this endpoint." });
    }

    const updatedUser = await adminUser.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true, // Ensures the updates follow schema validation rules
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "Admin user not found." });
    }

    res.status(200).json({ message: "Admin user updated successfully.", data: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error updating admin user.", error: error.message });
  }
};