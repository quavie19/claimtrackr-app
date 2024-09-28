const express = require('express');
const pool = require('./db');
const app = express();
const cors = require('cors');

//middleware
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
