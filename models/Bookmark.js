const mongoose = require('mongoose');

const BookmarkSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  poster_path: { type: String, required: true },
  release_date: { type: String },
  vote_average: { type: Number, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Bookmark', BookmarkSchema);
