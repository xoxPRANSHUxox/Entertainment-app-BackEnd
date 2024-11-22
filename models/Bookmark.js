const mongoose = require('mongoose');

const BookmarkSchema = new mongoose.Schema(
  { 
    id: { type: String, required: true },
    title: { type: String, required: true }, // Title of the movie/show
    poster_path: { type: String, required: true }, // URL for the poster image
    release_date: { type: String }, // Release date of the movie/show
    vote_average: { type: Number, required: true }, // Average vote/rating
    userId: { type: String, required: true }, // Firebase user ID
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model('Bookmark', BookmarkSchema);
