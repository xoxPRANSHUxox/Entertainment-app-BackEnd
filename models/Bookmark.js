const mongoose = require('mongoose');
// Bookmark Schema
const bookmarkSchema = new mongoose.Schema({
  id: { type: String, required: true }, // Movie ID
  title: { type: String, required: true },
  poster_path: { type: String },
  release_date: { type: String },
  vote_average: { type: Number },
  userId: { type: String, required: true }, // User ID for the bookmark
});

// Creating a compound index to ensure unique combinations of id and userId
bookmarkSchema.index({ id: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model('Bookmark', bookmarkSchema);
