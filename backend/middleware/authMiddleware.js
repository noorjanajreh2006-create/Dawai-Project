const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => { // The auth middleware protects private routes by checking if the user has a valid token before allowing access.
  const authHeader = req.headers.authorization; // Any one without a token is NOT allowed to enter

  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1]; // To take only the token without bearer

  if (!token) {
    return res.status(401).json({ message: 'Invalid token format' }); 
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Checks if the token is valid, authentic, and created by the server.
    req.user = decoded;
    next(); // You are allowed to access the route
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;