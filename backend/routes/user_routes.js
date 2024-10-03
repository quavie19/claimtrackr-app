const express = require('express');
const router = express.Router(); // Use Router instead of express()
const { protectedRoute } = require('../middleware/middleware');

const { getCustomer } = require('../controllers/user_controller');

router.get('/:id', protectedRoute, getCustomer, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

module.exports = router;
