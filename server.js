const express = require('express');
const cors = require('cors'); // Import CORS
const connectDB = require('./config/db');
const bookmarkRoutes = require('./routes/bookmarks');

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(express.json());

// Enable CORS
app.use(
  cors({
    origin: 'http://localhost:5173', // Allow requests from your frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
    credentials: true, // Allow cookies to be sent with requests
  })
);

// Routes
app.use('/bookmarks', bookmarkRoutes);

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
