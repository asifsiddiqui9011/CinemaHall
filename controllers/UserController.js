const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const JWT_SECRET = process.env.JWT_SECRETKEY;


exports.createUser = async (req, res) => {
  try {
    const { name, email, password, location, phone, age } = req.body;

   
    if (!name || !email || !password || !phone) {
      return res.status(400).json({ message: "Missing required fields" });
    }

  
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
    console.error("Error creating user:", error); 
    res.status(500).json({
      message: "Error creating user",
      error: error.message || error,
    });
  }
};


exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;


    const user = await User.findOne({email});
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }


    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

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


exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({
      message: "Error retrieving users",
      error: error.message || error,
    });
  }
};


// exports.getUserById = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id);
//     console.log(user.$assertPopulated,"user")
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.status(200).json(user);
//   } catch (error) {
//     console.error("Error retrieving user:", error); 
//     res.status(500).json({
//       message: "Error retrieving user",
//       error: error.message || error,
//     });
//   }
// };
// exports.getUserById = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.send(user);
//   } catch (error) {
//     res.status(500).json({ message: "Error retrieving user", error });
//   }
// };

exports.getUserById = async (req, res) => {
  try {
    // Find the user by the ID from the token (req.user should have been set by fetchUser)
    const userId = req.user.id
    // const user = await User.findById(userId).populate('tickets');
    const user = await User.findById(userId).populate({
      path: 'tickets',
      populate: [
        { path: 'screenId', model: 'Screen' },
        { path: 'movieId', model: 'Movie' },
        { path: 'slotId', model: 'slot' }
      ]
    });

    console.log("User data with populated tickets:", user); // Log result to verify


    // If the user is not found, return 404
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send the user data if found
    res.json(user);
  } catch (error) {
    console.error("Error retrieving user:", error);
    return res.status(500).json({ message: "Error retrieving user", error });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { name, email, password, location, phone, age } = req.body;

   
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
    console.error("Error updating user:", error); 
    res.status(500).json({
      message: "Error updating user",
      error: error.message || error,
    });
  }
};


exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error); 
    res.status(500).json({
      message: "Error deleting user",
      error: error.message || error,
    });
  }
};
