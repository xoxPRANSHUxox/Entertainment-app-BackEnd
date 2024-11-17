const admin = require('firebase-admin');
const serviceAccount = require('./firebaseAdmin/serviceAccountKey.json'); // Replace with your Firebase service account key file

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
