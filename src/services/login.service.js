const { User } = require('../database/models');
const { generateToken } = require('../helpers/JWTToken');

const authentication = async ({ email, password }) => {
  const user = await User.findOne({
    attributes: ['id', 'displayName', 'email'],
    where: { email, password },
  });

  if (!user) return false;

  const token = generateToken(user.dataValues);
  
  return { token };
};

module.exports = {
  authentication,
};