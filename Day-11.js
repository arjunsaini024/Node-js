const jwt = require("jsonwebtoken");

function authenticationMiddleware(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  // Verify JWT token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
    // If token is valid, set decoded user information on request object for further use
    req.user = decoded;
    next();
  });
}

module.exports = authenticationMiddleware;