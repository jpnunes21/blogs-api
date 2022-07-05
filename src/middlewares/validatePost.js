const { getCategories } = require('../services/categories.service');

const validatePost = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;

  if (!title || !content || !categoryIds) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  const categories = await getCategories();

  const isValidCategory = categories.filter((category) => categoryIds.includes(category.id));

  if (isValidCategory.length === 0) {
    return res.status(400).json({ message: '"categoryIds" not found' });
  }

  next();
};

module.exports = validatePost;
