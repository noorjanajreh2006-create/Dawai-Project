require('dotenv').config(); // To get all data in env file

const express = require('express');
const cors = require('cors'); // Allowed frontend to communicate with backend
const sequelize = require('./config/db'); // Connect with DB (MySQL)
const authRoutes = require('./routes/authRoutes');

const app = express();

require('./models/User');

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Server is running');
});

sequelize.sync() // sync between models and DB
  .then(() => {
    console.log('Database connected and synced');

    app.listen(process.env.PORT, () => {
      console.log(`Server running on http://localhost:${process.env.PORT}`); // Starts the server on the port defined in the env file
    });
  })
  .catch((err) => {
    console.log('Database error:', err);
  });