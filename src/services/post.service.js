const { Op } = require('sequelize'); // https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#operators

const { 
  BlogPost,
  PostCategory,
  User,
  Category,
  Sequelize,
} = require('../database/models');

const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);

const createPost = async (id, { title, content, categoryIds }) => {
  const result = await sequelize.transaction(async (t) => {
    const newPost = await BlogPost.create({ title, content, userId: id }, { transaction: t });
    await Promise.all(
        categoryIds.map((categoryId) => PostCategory.create({
        postId: newPost.id,
        categoryId,
      }, { transaction: t })),
    );

    return newPost.id;
  });

  const newPostById = await BlogPost.findByPk(result);

  return newPostById;
};

const getPosts = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return posts;
};

const getPostsById = async (id) => {
  const post = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return post;
};

const getPostByQuery = async (q) => {
  const queryValue = `%${q}%`;

  const post = await BlogPost.findAll({
    where: { [Op.or]: [
      { title: { [Op.like]: queryValue } },
      { content: { [Op.like]: queryValue } },
    ] },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  // https://stackoverflow.com/questions/20695062/sequelize-or-condition-object

  // https://pt.stackoverflow.com/questions/355872/como-utilizar-o-like-do-sql-no-sequelize

  return post;
};

const updatePost = async (id, { title, content }) => {
  await BlogPost.update({
    title, content,
  }, { where: { id } });

  const updatedPost = await getPostsById(id);

  return updatedPost;
};

const removePost = async (id) => {
  const result = await sequelize.transaction(async (t) => {
    const isPostDeleted = await BlogPost.destroy({
      where: { id },
    }, { transaction: t });

    await PostCategory.destroy({ where: { postId: id } }, { transaction: t });

    return isPostDeleted > 0;
  });

  return result;
};

module.exports = {
  createPost,
  getPosts,
  getPostsById,
  updatePost,
  removePost,
  getPostByQuery,
};
