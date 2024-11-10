


exports.fetchTheater = (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) {
      return res
        .status(401)
        .json({ message: "Access token is missing or invalid" });
    }
  
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token" });
      }
      req.user = user;
      next();
    });
  };
  