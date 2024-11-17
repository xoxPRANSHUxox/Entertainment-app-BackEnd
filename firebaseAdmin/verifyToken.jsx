const admin = require('./firebaseAdmin');

const verifyToken = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).send({ message: 'Authentication required' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken; // Attach user data to the request object
    next();
  } catch (err) {
    console.error(err);
    res.status(401).send({ message: 'Invalid token' });
  }
};

module.exports = verifyToken;
