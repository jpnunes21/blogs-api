const { authToken } = require('../helpers/JWTToken');

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const payload = await authToken(token);

  if (!payload) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }

  res.locals.payload = payload;

  next();
};

module.exports = validateToken;