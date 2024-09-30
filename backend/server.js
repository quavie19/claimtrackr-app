const express = require('express');
const app = express();
const cors = require('cors');
const authRoutes = require('./routes/auth_routes');

// middleware
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
