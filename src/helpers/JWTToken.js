const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '15m',
  algorithm: 'HS256',
};

const generateToken = (payload) => jwt.sign(payload, SECRET, jwtConfig);

const authToken = async (token) => {
  try {
    const decoded = await jwt.verify(token, SECRET, jwtConfig);
    
    return decoded;
  } catch (error) {
    console.log('erro', error.message);
  }
};

module.exports = {
  generateToken,
  authToken,
};