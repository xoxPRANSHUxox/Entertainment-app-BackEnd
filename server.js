const express = require('express');
const cors = require('cors'); // Import CORS
const connectDB = require('./config/db'); // Import database connection
const bookmarkRoutes = require('./routes/bookmarks'); // Import routes for bookmarks
require('dotenv').config();

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(express.json()); // To parse JSON bodies
app.use(cors({
  origin: 'https://entertainment-app-xox.vercel.app/', // Frontend domain (adjust for production)
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true, 
}));

// Define routes
app.use('/bookmarks', bookmarkRoutes); // Bookmark-related routes

// Error handling middleware (optional)
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start the server
const PORT = process.env.PORT || 5000; // environment variable for port (default 5000)
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
