const express = require('express');
const validateLogin = require('./middlewares/validateLogin');
const validateUser = require('./middlewares/validateUser');
const validateUserEmail = require('./middlewares/validateUserEmail');
const validateToken = require('./middlewares/validateToken');
const validatePost = require('./middlewares/validatePost');
const validateUserPost = require('./middlewares/validateUserPost');

const router = express.Router();

const loginController = require('./controllers/login.controller');
const userController = require('./controllers/user.controller');
const categoriesController = require('./controllers/categories.controller');
const postController = require('./controllers/post.controller');

router.post('/login', validateLogin, async (req, res) => {
  loginController.authLogin(req, res);
});

router.post('/user', validateUser, validateUserEmail, async (req, res) => {
  userController.createUser(req, res);
});

router.get('/user', validateToken, async (req, res) => {
  userController.findUsers(req, res);
});

router.get('/user/:id', validateToken, async (req, res) => {
  userController.findUserById(req, res);
});

router.post('/categories', validateToken, async (req, res) => {
  categoriesController.createCategory(req, res);
});

router.get('/categories', validateToken, async (req, res) => {
  categoriesController.getCategories(req, res);
});

router.post('/post', validateToken, validatePost, async (req, res) => {
  postController.createPost(req, res);
});

router.get('/post/search', validateToken, async (req, res) => {
  postController.getPostsByQuery(req, res);
});

router.get('/post', validateToken, async (req, res) => {
  postController.getPosts(req, res);
});

router.get('/post/:id', validateToken, async (req, res) => {
  postController.getPostsById(req, res);
});

router.put('/post/:id', validateToken, validateUserPost, async (req, res) => {
  postController.updatePost(req, res);
});

router.delete('/post/:id', validateToken, validateUserPost, async (req, res) => {
  postController.deletePost(req, res);
});

router.delete('/user/me', validateToken, async (req, res) => {
  userController.deleteUser(req, res);
});

module.exports = router;
