const express = require('express');
const cors = require('cors'); // Import CORS
const connectDB = require('./config/db');
const bookmarkRoutes = require('./routes/bookmarks');
const path = require('path');

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(express.json());

// Enable CORS
// CORS configuration
const corsOptions = {
  origin: 'https://entertainment-app-xox.vercel.app', // Allow only your frontend domain
  methods: ['GET', 'POST', 'DELETE', 'PUT'], // Add the methods you need
  allowedHeaders: ['Content-Type', 'Authorization'], // If you're sending custom headers
  credentials: true, // Allow cookies if needed
};

// Enable CORS with the above settings
app.use(cors(corsOptions));


// Routes
app.use('/bookmarks', bookmarkRoutes);

// 404 Page for unknown routes

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, '404.html'));
});


// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
