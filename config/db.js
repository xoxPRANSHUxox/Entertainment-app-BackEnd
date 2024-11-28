const mongoose = require('mongoose');

// Db connection Setup 
const connectDB = async () => {
  try {
    const dbUrl = 'mongodb+srv://Pranshu:Pranshu2002@entertainment-app.pzuon.mongodb.net/'
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
