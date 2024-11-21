const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://Pranshu:Pranshu2002@entertainment-app.pzuon.mongodb.net/', {
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
