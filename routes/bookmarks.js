const express = require('express');
const Bookmark = require('../models/Bookmark');
const { verifyToken } = require('../firebaseAdmin/verifyToken'); // Import verifyToken from firebaseAdmin
const router = express.Router();

// Get bookmarks for a specific user
router.get('/', verifyToken, async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({ userId: req.user.uid }); // Use the user ID from the verified token
    res.status(200).json(bookmarks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching bookmarks' });
  }
});

// Add a new bookmark for a specific user
router.post('/', verifyToken, async (req, res) => {
  const { id, title, poster_path, release_date, vote_average } = req.body;

  try {
    // Check if the bookmark already exists for this specific user and movie ID
    const existingBookmark = await Bookmark.findOne({ id, userId: req.user.uid });
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
      userId: req.user.uid, // Use the user ID from the verified token
    });

    await newBookmark.save();
    res.status(201).json(newBookmark);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding bookmark' });
  }
});

// Delete a bookmark by ID
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const bookmark = await Bookmark.findOneAndDelete({ _id: req.params.id, userId: req.user.uid });
    if (!bookmark) {
      return res.status(404).json({ message: 'Bookmark not found or you do not have permission to delete it' });
    }
    res.status(200).json({ message: 'Bookmark deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting bookmark' });
  }
});

module.exports = router;
