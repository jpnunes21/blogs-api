const postService = require('../services/post.service');

const createPost = async (req, res) => {
  try {
    const { id } = res.locals.payload;
    const newPost = await postService.createPost(id, req.body);
    return res.status(201).json(newPost);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await postService.getPosts();
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getPostsById = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await postService.getPostsById(id);

    if (!post) {
      return res.status(404).json({ message: 'Post does not exist' });
    }

    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getPostsByQuery = async (req, res) => {
  try {
    const { q } = req.query;
    
    const postByQuery = await postService.getPostByQuery(q);

    return res.status(200).json(postByQuery);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: 'Some required fields are missing' });
    }

    const updatedPost = await postService.updatePost(id, req.body);

    return res.status(200).json(updatedPost);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const isDeleted = await postService.removePost(id);

    if (!isDeleted) return res.status(404).json({ message: 'Post does not exist' });

    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPost,
  getPosts,
  getPostsById,
  updatePost,
  deletePost,
  getPostsByQuery,
};
