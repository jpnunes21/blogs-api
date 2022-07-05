const userService = require('../services/user.service');

const createUser = async (req, res) => {
  try {
    const newUser = await userService.createUser(req.body);
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }  
};

const findUsers = async (req, res) => {
  try {
    const users = await userService.findUsers();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const findUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const userById = await userService.findUserById(id);

    if (!userById) return res.status(404).json({ message: 'User does not exist' }); 

    return res.status(200).json(userById);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = res.locals.payload;

    const isDeleted = await userService.deleteUser(id);

    if (!isDeleted) return res.status(404).json({ message: 'User does not exist' });

    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  findUsers,
  findUserById,
  deleteUser,
};