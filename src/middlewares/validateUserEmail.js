const { User } = require('../database/models');

const validateUserEmail = async (req, res, next) => {
  const { email } = req.body;
  
  const re = /\S+@\S+\.\S+/;
  
  if (!re.test(email)) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  } // https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/

  const user = await User.findOne({
    attributes: ['email'],
    where: { email },
  });

  if (user) return res.status(409).json({ message: 'User already registered' });

  next();
};

module.exports = validateUserEmail;
