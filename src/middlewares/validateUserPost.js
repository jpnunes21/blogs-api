const { getPostsById } = require('../services/post.service');

const validateUserPost = async (req, res, next) => {
  const { email } = res.locals.payload;
  const { id } = req.params;

  const post = await getPostsById(id);

  if (!post) {
    return res.status(404).json({ message: 'Post does not exist' });
  }

  if (post.dataValues.user.dataValues.email !== email) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }

  next();
};

module.exports = validateUserPost;