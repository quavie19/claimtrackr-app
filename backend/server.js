const express = require('express');
const app = express();
const cors = require('cors');

// routes import
const authRoutes = require('./routes/auth_routes');
const userRoutes = require('./routes/user_routes');
// const fakerRoutes = require('./routes/faker_routes');

// middleware
app.use(cors());
app.use(express.json());

//routes
app.use('/api', authRoutes);
app.use('/api', userRoutes);
// app.use('/faker', fakerRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
