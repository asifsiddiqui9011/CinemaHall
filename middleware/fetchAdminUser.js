const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_ADMINSECRETKEY;


 
const fetchAdminUser = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) {
    return res.status(401).json({ errors: "Please authenticate using a valid email ID and password" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data; // Ensure this matches your JWT structure
    next();
  } catch (error) {
    console.error("JWT verification failed:", error);
    return res.status(401).json({ errors: "Please authenticate using a valid token" });
  }
};


module.exports = fetchAdminUser;




// const authenticateToken = (req, res, next) => {
//   const token = req.header('auth-token');
  
//   if (!token) return res.status(401).json({ message: 'Access Denied. No Token Provided.' });

//   try {
//     const verified = jwt.verify(token, JWT_SECRET); 
//     req.user = verified; 
//     next();
//   } catch (error) {
//     res.status(400).json({ message: 'Invalid Token' });
//   }
// };

// module.exports = authenticateToken;