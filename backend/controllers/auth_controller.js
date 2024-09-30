const pool = require('../db');

//activate customer account
const activate = async (req, res) => {
  try {
    const { policy_number, phone_number, zip_code } = req.body;
    const user = await pool.query(
      'SELECT * FROM customers WHERE policy_number = $1 AND phone_number = $2 AND zip_code = $3',
      [policy_number, phone_number, zip_code]
    );

    if (user.rows.length === 0) {
      return res
        .status(404)
        .json({ message: 'Customer not found or information incorrect' });
    }
    //check if user is already active
    if (user.rows[0].is_active) {
      return res
        .status(400)
        .json({ success: false, message: 'Account is already activated' });
    }
    // Mark the user as active
    await pool.query(
      'UPDATE customers SET is_active = TRUE WHERE user_id = $1',
      [user.rows[0].user_id]
    );

    res.json({
      message:
        'Account activated successfully. Please create your username and password.',
    });
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = {
  activate,
};
