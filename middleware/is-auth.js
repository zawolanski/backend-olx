const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  let decodedToken;
  try {
    const token = req.get('Authorization').split(' ')[1];
    decodedToken = jwt.verify(token, 'sebastianzawolanski');
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }

  if (!decodedToken) {
    const error = new Error('Not authenticated!');
    error.statusCode = 401;
    throw error;
  }

  req.userId = decodedToken.userId;
  next();
};
