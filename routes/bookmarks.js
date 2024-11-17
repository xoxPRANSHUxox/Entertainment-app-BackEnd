const express = require('express');
const Bookmark = require('../models/bookmark');
const router = express.Router();

// Get bookmarks for a specific user
router.get('/', async (req, res) => {
  const { userId } = req.query;
  
  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    const bookmarks = await Bookmark.find({ userId }); // Filter by userId
    res.status(200).json(bookmarks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching bookmarks' });
  }
});

// Add a new bookmark for a specific user
router.post('/', async (req, res) => {
  const { id, title, poster_path, release_date, vote_average, userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    // Check if the bookmark already exists for this specific user and movie ID
    const existingBookmark = await Bookmark.findOne({ id, userId });
    if (existingBookmark) {
      return res.status(400).json({ message: 'Bookmark with this ID already exists for this user' });
    }

    // If no existing bookmark for this user and movie, create a new one
    const newBookmark = new Bookmark({
      id,
      title,
      poster_path,
      release_date,
      vote_average,
      userId
    });

    await newBookmark.save();
    res.status(201).json(newBookmark);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding bookmark' });
  }
});


// Delete a bookmark by ID
router.delete('/:id', async (req, res) => {
  try {
    const bookmark = await Bookmark.findByIdAndDelete(req.params.id);
    if (!bookmark) {
      return res.status(404).json({ message: 'Bookmark not found' });
    }
    res.status(200).json({ message: 'Bookmark deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting bookmark' });
  }
});

module.exports = router;
