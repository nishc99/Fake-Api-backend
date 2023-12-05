// routes/postsRoutes.js
const express = require('express');
const postsController = require('../controllers/postsController');

const router = express.Router();

router.get('/posts', postsController.getPosts);
router.get('/posts/:id', postsController.getPostById);
router.post('/posts', postsController.createPost);
router.put('/posts/:id', postsController.updatePost);
router.patch('/posts/:id', postsController.updatePostPartial);
router.delete('/posts/:id', postsController.deletePost);

module.exports = router;
