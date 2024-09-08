const jwt = require('jsonwebtoken')
const JWT_SECRET ="Movie_ticket";
const User = require('../models/User')

exports.authenticateToken = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access token is missing or invalid" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.log(token,req.user)
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = user;
    next();
  });
};
