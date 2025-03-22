require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const movieRoutes = require('./routes/movies');
const userRoutes = require('./routes/users');

const app = express();

// Connect to the database
connectDB();

// Middleware to parse JSON request bodies
app.use(express.json());

// Routes
app.use('/movies', movieRoutes);
app.use('/users', userRoutes);

// Start the server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
