const pool = require('../db');

//get a user (policies and claim info)
const getCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const customerResult = await pool.query('SELECT ');
    const claimsResult = await pool.query('');
    const policiesResult = await pool.query('');
  } catch (err) {
    console.error(err.message);
  }
};
