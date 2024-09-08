const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const adminUser = require("../models/adminUser.js");

const JWT_SECRET = "admin_user_key";

// Signup Controller
exports.signup = async (req, res) => {
  const { username, email, password, phoneNumber, location } = req.body;

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
    });

    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, {
      expiresIn: "1h",
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

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({success:true, token, user:{email:user.email, phoneNumber:user. phoneNumber,username:user.username} });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


exports.getUser = async (req, res) => {
  try {
    console.log(req.user.userId); 

    const user = await adminUser.findById(req.user.userId); 

    if (!user) return res.status(404).json({ message: 'User not found' });
    
    res.status(200).json({success:true,user:{email:user.email,phoneNumber:user.phoneNumber,username:user.username}});
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};
