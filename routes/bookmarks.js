const express = require('express');
const Bookmark = require('../models/Bookmark');
const router = express.Router();

// GET all bookmarks for a specific user
router.get('/', async (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ message: 'User ID is required' });

  try {
    const bookmarks = await Bookmark.find({ userId });
    res.status(200).json(bookmarks);
  } catch (err) {
    console.error('Error fetching bookmarks:', err);
    res.status(500).json({ message: 'Failed to fetch bookmarks' });
  }
});

// POST a new bookmark for a specific user
router.post('/', async (req, res) => {
  const { id, title, poster_path, release_date, vote_average, userId } = req.body;

  if (!userId || !id) {
    return res.status(400).json({ message: 'User ID and Movie ID are required' });
  }

  try {
    // Check if the bookmark already exists for the specific user
    const existingBookmark = await Bookmark.findOne({ id, userId });
    if (existingBookmark) {
      return res.status(400).json({ message: 'Bookmark already exists' });
    }

    // Create and save the new bookmark
    const newBookmark = new Bookmark({
      id,
      title,
      poster_path,
      release_date,
      vote_average,
      userId,
    });

    await newBookmark.save();
    res.status(201).json({ message: 'Bookmark added successfully', bookmark: newBookmark });
  } catch (err) {
    console.error('Error creating bookmark:', err);
    res.status(500).json({ message: 'Failed to create bookmark' });
  }
});


// DELETE a bookmark by MongoDB's _id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBookmark = await Bookmark.findByIdAndDelete(id);
    if (!deletedBookmark) {
      return res.status(404).json({ message: 'Bookmark not found' });
    }
    res.status(200).json({ message: 'Bookmark deleted successfully' });
  } catch (err) {
    console.error('Error deleting bookmark:', err);
    res.status(500).json({ message: 'Failed to delete bookmark' });
  }
});

module.exports = router;