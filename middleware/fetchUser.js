// const jwt = require('jsonwebtoken')
// const JWT_SECRET ="Movie_ticket";
// const User = require('../models/User')

// const authenticateToken =async (req, res, next) => {
//   const token = req.header("auth-token");
//   if (!token) {
//     return res
//       .status(401)
//       .json({ message: "Access token is missing or invalid" });
//   }

//   jwt.verify(token, JWT_SECRET, (err, user) => {
//     if (err) {
//       console.log(token,req.user)
//       return res.status(403).json({ message: "Invalid token" });
//     }
//     req.user = user;
//     next();
//   });
// };

// module.exports = authenticateToken;

// const fetchUser = async (req,res,next)=>{
//   const token = req.header('auth-token');
//   console.log(token,"token")
//   if (!token){
//       res.status(401).send({errors:"Please authentication using valid email id and password"})
//   }
//   else {
//       try {
//           const data = jwt.verify(token,JWT_SECRET);
//           req.user = data.user;
//           next();
//       } catch (error) {
//           res.status(401).send({errors:"Please Authenticate Using Valid Token"})
//       }
//   }
// }

// // module.exports=fetchUser;


const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRETKEY; // Make sure to store this in an environment variable for production

const fetchUser = (req, res, next) => {
  // Get the token from the request header
  const token = req.header('auth-token');

  // If no token is found, send a 401 Unauthorized error
  if (!token) {
    return res.status(401).json({ errors: "Please authenticate using a valid email ID and password" });
  }

  // Try to verify the token
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data; // Assuming the payload has the user object or user ID
    next(); // Move to the next middleware or route handler
  } catch (error) {
    console.error("JWT verification failed:", error);
    return res.status(401).json({ errors: "Please authenticate using a valid token" });
  }
};

module.exports = fetchUser;
