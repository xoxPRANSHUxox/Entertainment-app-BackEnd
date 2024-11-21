const admin = require('./firebaseAdmin');

// Middleware to verify Firebase token
const verifyToken = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).send({ message: 'Authentication required' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken; // Attach user data to the request object
    next();
  } catch (error) {
    console.error('Error verifying token:', error.message);
    res.status(401).send({ message: 'Invalid or expired token' });
  }
};

module.exports = verifyToken;
