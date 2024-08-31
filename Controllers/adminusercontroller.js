const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const adminUser = require("../Models/adminUser");

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

    res.status(201).json({ token, userId: newUser._id });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
    console.log(error);
  }
};

// Login Controller
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await adminUser.findOne({ email });
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

    res.status(200).json({ token, userId: user._id });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
