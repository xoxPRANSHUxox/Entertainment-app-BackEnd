const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Ensure DB_URL is being loaded correctly from the environment variables
    const dbUrl = process.env.DB_URL;
    if (!dbUrl) {
      console.error('MongoDB URL is not defined in the environment variables.');
      process.exit(1);
    }

    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB Connected');
  } catch (err) {
    console.error('Database Connection Error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
