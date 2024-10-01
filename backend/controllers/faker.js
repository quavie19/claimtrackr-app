const pool = require('../db');
const { faker } = require('@faker-js/faker');

const generateData = async (req, res) => {
  try {
    // Step 2: Insert Fake Customers
    const customerIds = [];
    for (let i = 0; i < 50; i++) {
      const firstName = faker.person.firstName(); // Updated
      const lastName = faker.person.lastName(); // Updated
      const username = faker.internet.userName();
      const passwordHash = faker.internet.password();
      const email = faker.internet.email();
      const phoneNumber = faker.phone.number('###-###-####');
      const zipCode = faker.location.zipCode(); // Updated for address
      const isActive = faker.datatype.boolean();

      const result = await pool.query(
        `INSERT INTO Customers (first_name, last_name, username, password_hash, email, phone_number, zip_code, is_active)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING user_id`,
        [
          firstName,
          lastName,
          username,
          passwordHash,
          email,
          phoneNumber,
          zipCode,
          isActive,
        ]
      );
      customerIds.push(result.rows[0].user_id);
    }

    // Step 3: Insert Fake Adjusters
    const adjusterIds = [];
    for (let i = 0; i < 10; i++) {
      const firstName = faker.person.firstName(); // Updated
      const lastName = faker.person.lastName(); // Updated
      const email = faker.internet.email();
      const phoneNumber = faker.phone.number('###-###-####');

      const result = await pool.query(
        `INSERT INTO Adjusters (first_name, last_name, email, phone_number)
         VALUES ($1, $2, $3, $4) RETURNING adjuster_id`,
        [firstName, lastName, email, phoneNumber]
      );
      adjusterIds.push(result.rows[0].adjuster_id);
    }

    // Step 4: Insert Fake Policies and Claims (No changes needed here)
    const statusesRes = await pool.query(`SELECT status_id FROM ClaimStatus`);
    const statusIds = statusesRes.rows.map((row) => row.status_id);

    for (let i = 0; i < 100; i++) {
      const customerId =
        customerIds[faker.number.int({ min: 0, max: customerIds.length - 1 })];
      const adjusterId =
        adjusterIds[faker.number.int({ min: 0, max: adjusterIds.length - 1 })];
      const policyNumber = faker.finance.accountNumber(); // Updated line
      const claimNumber = faker.string.uuid(); // Updated line
      const claimDescription = faker.lorem.sentence();
      const dateOfLoss = faker.date.past();
      const statusId =
        statusIds[faker.number.int({ min: 0, max: statusIds.length - 1 })];

      // Insert policy
      const policyResult = await pool.query(
        `INSERT INTO Policies (customer_id, policy_number, policy_type, start_date)
         VALUES ($1, $2, 'Auto', CURRENT_DATE) RETURNING policy_id`,
        [customerId, policyNumber]
      );

      const policyId = policyResult.rows[0].policy_id;

      // Insert claim
      await pool.query(
        `INSERT INTO Claims (policy_id, claim_number, claim_description, adjuster_id, status_id, date_of_loss)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [
          policyId,
          claimNumber,
          claimDescription,
          adjusterId,
          statusId,
          dateOfLoss,
        ]
      );
    }
    console.log(customerIds.phoneNumber);
    res.status(201).send('Fake data generated successfully');
  } catch (error) {
    console.error('Error generating fake data:', error.message, error.stack);
    res.status(500).send('Error generating fake data');
  }
};

module.exports = { generateData };
