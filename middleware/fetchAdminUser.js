const jwt = require('jsonwebtoken')
const JWT_SECRET = "admin_user_key";


 

exports.authenticateToken = (req, res, next) => {
  const token = req.header('auth-token');
  
  if (!token) return res.status(401).json({ message: 'Access Denied. No Token Provided.' });

  try {
    const verified = jwt.verify(token, JWT_SECRET); 
    req.user = verified; 
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid Token' });
  }
};
