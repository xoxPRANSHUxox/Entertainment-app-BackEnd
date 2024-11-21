const express = require('express');
const jwt = require('jsonwebtoken');
const Bookmark = require('../models/Bookmark');

const router = express.Router();
const JWT_SECRET = 'your_jwt_secret_key_here'; // Same as used in auth.js

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    console.error('Invalid token:', err.message);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// Get all bookmarks for a user
router.get('/', verifyToken, async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({ userId: req.userId });
    res.status(200).json(bookmarks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Add a new bookmark
router.post('/', verifyToken, async (req, res) => {
  const { id, title, poster_path, release_date, vote_average } = req.body;

  try {
    const bookmark = new Bookmark({
      id,
      title,
      poster_path,
      release_date,
      vote_average,
      userId: req.userId,
    });
    await bookmark.save();
    res.status(201).json(bookmark);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete a bookmark
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const bookmark = await Bookmark.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!bookmark) {
      return res.status(404).json({ message: 'Bookmark not found' });
    }
    res.status(200).json({ message: 'Bookmark deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
