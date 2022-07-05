const loginService = require('../services/login.service');

const authLogin = async (req, res) => {
  try {
    const token = await loginService.authentication(req.body);
    
    if (!token) return res.status(400).json({ message: 'Invalid fields' });
    
    return res.status(200).json(token);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  authLogin,
};