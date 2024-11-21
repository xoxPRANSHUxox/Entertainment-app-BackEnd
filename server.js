const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const bookmarkRoutes = require('./routes/bookmarks');

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/bookmarks', bookmarkRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
