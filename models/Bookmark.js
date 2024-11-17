const mongoose = require('mongoose');

// Define the Bookmark schema
const bookmarkSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  poster_path: { type: String, required: true },
  release_date: { type: String },
  vote_average: { type: Number, required: true },
  userId: { type: String, required: true }
}, { timestamps: true });

const Bookmark = mongoose.model('Bookmark', bookmarkSchema);
module.exports = Bookmark;
