const { User, BlogPost, Sequelize } = require('../database/models');
const { generateToken } = require('../helpers/JWTToken');

const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);

const createUser = async ({ displayName, email, password, image,
}) => {
  const newUser = await User.create({
        displayName,
        email,
        password,
        image,
    });

  const token = generateToken(newUser.dataValues);
  return { token };
};

const findUsers = async () => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
  });

  return users;
};

const findUserById = async (id) => {
  const userById = await User.findByPk(id, {
    attributes: { exclude: ['password'] },
  });

  // https://stackoverflow.com/questions/69836342/how-to-use-both-include-and-attributes-in-findbypk-statement-in-sequelize

  return userById;
};

const deleteUser = async (id) => {
  const result = await sequelize.transaction(async (t) => {
    await BlogPost.destroy({
      where: { userId: id },
    }, { transaction: t });

    const isUserDeleted = await User.destroy({
      where: { id },
    }, { transaction: t });

    return isUserDeleted > 0;
  });
  
  return result;
};

module.exports = {
  createUser,
  findUsers,
  findUserById,
  deleteUser,
};