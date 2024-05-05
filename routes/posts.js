const express = require('express');
const router = express.Router();
const handleErrorAsync = require('../service/handleErrorAsync');
const PostControllers = require('../controllers/posts');
const UserControllers = require('../controllers/users');
const isAuthenticator = require('../service/isAuthenticator');

/* GET home page. */
router.get('/',isAuthenticator, handleErrorAsync(PostControllers.getPosts));
router.post('/',isAuthenticator, handleErrorAsync(PostControllers.createPost));
router.patch('/:id', handleErrorAsync(PostControllers.editPost));
router.delete('/', handleErrorAsync(PostControllers.deletePosts));
router.delete('/:id', handleErrorAsync(PostControllers.deletePost));


module.exports = router;
