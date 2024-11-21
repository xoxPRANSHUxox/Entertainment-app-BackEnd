const firebaseAdmin = require('firebase-admin');
const serviceAccount = require('../config/serviceAccountKey.json'); // Path to your Firebase serviceAccountKey.json

// Initialize Firebase Admin SDK
firebaseAdmin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = firebaseAdmin;
