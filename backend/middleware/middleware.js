const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');

// Secret key for signing the JWT
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Middleware to protect routes
const protectedRoute = (req, res, next) => {
  const token =
    req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

  if (!token)
    return res.status(401).json({ error: 'Unauthorized: No Token Provided' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Forbidden: Invalid Token' });
    req.user = user; // Save user info in request for use in protected routes
    next();
  });
};

// Rate limit: maximum 5 requests per minute
const loginLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // limit each IP to 5 requests per windowMs
  message: 'Too many login attempts, please try again later.',
});

module.exports = { protectedRoute, loginLimiter };
