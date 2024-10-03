const pool = require('../db');

// Get a user (customer, policies, and claim info)
const getCustomer = async (req, res) => {
  try {
    const { id } = req.params; // Extract the user ID from the URL parameters
    const customerResult = await pool.query(
      'SELECT * FROM customer_policy_claims WHERE user_id = $1',
      [id]
    );

    // Check if the customer was found
    if (customerResult.rows.length === 0) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    // Send the customer information as a JSON response
    res.json(customerResult.rows[0]); // Send the first (and expected only) result
  } catch (err) {
    console.error('Error fetching customer:', err.message);
    res
      .status(500)
      .json({ error: 'Internal Server Error', message: err.message });
  }
};

module.exports = { getCustomer };
