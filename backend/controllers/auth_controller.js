const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
const pool = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // Import bcrypt for password hashing

// Secret key for signing the JWT
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Rate limit: maximum 5 requests per minute
const loginLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // limit each IP to 5 requests per windowMs
  message: 'Too many login attempts, please try again later.',
});

// Sign in
const login = async (req, res) => {
  // Validate input
  await body('username').isString().notEmpty().run(req);
  await body('password').isString().notEmpty().run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { username, password } = req.body;

    // Step 1: Query for the user by username
    const result = await pool.query(
      'SELECT * FROM customers WHERE username = $1',
      [username]
    );

    if (result.rows.length === 0) {
      // Step 2: If user doesn't exist, return an error response
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const user = result.rows[0];

    // Step 3: Compare provided password with the hashed password
    if (password !== user.password_hash) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Step 5: If login is successful, generate a JWT
    const token = jwt.sign(
      { user_id: user.user_id, username: user.username },
      JWT_SECRET,
      {
        expiresIn: '1h', // Token expires in 1 hour
      }
    );

    // Step 6: Return the JWT along with user info (except password)
    res.json({
      user_id: user.user_id,
      username: user.username,
      email: user.email,
      token, // Send the token to the client
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Middleware to protect routes
const authenticateToken = (req, res, next) => {
  const token =
    req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

  if (!token) return res.sendStatus(401); // Unauthorized

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Forbidden
    req.user = user; // Save user info in request for use in protected routes
    next();
  });
};

//activate account
const activate = async (req, res) => {
  try {
    const { policyNumber, phoneNumber, zipCode } = req.body;

    // Input validation
    if (!policyNumber || !phoneNumber || !zipCode) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Query for policies
    const policyResult = await pool.query(
      'SELECT * FROM policies WHERE policy_number = $1',
      [policyNumber]
    );

    // Query for customers
    const customerResult = await pool.query(
      'SELECT * FROM customers WHERE phone_number = $1 AND zip_code = $2',
      [phoneNumber, zipCode]
    );

    // Check if any policies or customers were found
    if (policyResult.rows.length === 0) {
      return res.status(404).json({ error: 'Policy not found.' });
    }

    if (customerResult.rows.length === 0) {
      return res.status(404).json({ error: 'Customer not found.' });
    }

    // Send a successful response with the policy and customer data
    res.status(200).json({
      policy: policyResult.rows[0], // Assuming you want a single policy
      customer: customerResult.rows[0], // Assuming you want a single customer
    });
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res
      .status(500)
      .json({ error: 'Internal Server Error', message: error.message });
  }
};

// create profile

const createProfile = async (req, res) => {
  try {
    // Destructure the username, password, and user_id from req.body
    const { username, password, user_id } = req.body;

    // Validate that required fields are present
    if (!username || !password || !user_id) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Hash the password before storing it
    const passwordHash = await bcrypt.hash(password, 10);

    // Perform the update query using user_id
    const result = await pool.query(
      'UPDATE customers SET username = $1, password_hash = $2 is_active = true WHERE user_id = $3',
      [username, passwordHash, user_id]
    );

    // Check if any row was updated
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Respond with success message
    res.status(200).json({ message: 'Profile updated successfully.' });
  } catch (err) {
    // Log the error message and send an error response
    console.error('Error updating profile:', err.message);
    res
      .status(500)
      .json({ error: 'Internal Server Error', message: err.message });
  }
};

module.exports = {
  login,
  loginLimiter,
  authenticateToken,
  activate,
  createProfile,
};
