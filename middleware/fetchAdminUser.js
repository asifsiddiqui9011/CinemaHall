const jwt = require('jsonwebtoken')
const JWT_SECRET = "admin_user_key";

// exports.authenticateAdminUser = (req, res, next) => {
//     // const authHeader = req.headers["authorization"];
//     // const token = authHeader && authHeader.split(" ")[1];
//     const token = req.header("auth-token");
//     if (!token) {
//       return res
//         .status(401)
//         .json({ message: "Access token is missing or invalid" });
//     }
  
//     jwt.verify(token, JWT_SECRET, (err, userId) => {
//       if (err) {
//         return res.status(403).json({ message: "Invalid token" });
//       }
//       req.userId = userId;
//       next();
//     });
//   };
  

 

exports.authenticateToken = (req, res, next) => {
  const token = req.header('auth-token');
  
  if (!token) return res.status(401).json({ message: 'Access Denied. No Token Provided.' });

  try {
    const verified = jwt.verify(token, JWT_SECRET); // JWT_SECRET is used here
    req.user = verified; // Store user details in the request object
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid Token' });
  }
};
