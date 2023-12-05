// controllers/postsController.js
const path = require('path');
const fs = require('fs/promises');

async function readJsonData(filePath) {
  const fileContent = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(fileContent);
}

async function writeJsonData(filePath, data) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

module.exports = {
  getPosts: async (req, res) => {
    try {
      const postsFilePath = path.join(__dirname, '..', 'public', 'posts.json');
      const jsonData = await readJsonData(postsFilePath);
      res.json(jsonData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getPostById: async (req, res) => {
    try {
      const postId = parseInt(req.params.id);
      const postsFilePath = path.join(__dirname, '..', 'public', 'posts.json');
      const jsonData = await readJsonData(postsFilePath);
      const post = jsonData.find(post => post.id === postId);

      if (!post) {
        res.status(404).json({ error: 'Post not found' });
        return;
      }

      res.json(post);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  createPost: async (req, res) => {
    try {
      const postsFilePath = path.join(__dirname, '..', 'public', 'posts.json');
      const jsonData = await readJsonData(postsFilePath);
      const newPost = req.body;
      newPost.id = jsonData.length + 1;
      jsonData.push(newPost);
      await writeJsonData(postsFilePath, jsonData);
      res.json(newPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  updatePost: async (req, res) => {
    try {
      const postId = parseInt(req.params.id);
      const postsFilePath = path.join(__dirname, '..', 'public', 'posts.json');
      const jsonData = await readJsonData(postsFilePath);
      const updatedPostIndex = jsonData.findIndex(post => post.id === postId);

      if (updatedPostIndex === -1) {
        res.status(404).json({ error: 'Post not found' });
        return;
      }

      const updatedPost = { ...jsonData[updatedPostIndex], ...req.body };
      jsonData[updatedPostIndex] = updatedPost;
      await writeJsonData(postsFilePath, jsonData);
      res.json(updatedPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  updatePostPartial: async (req, res) => {
    try {
      const postId = parseInt(req.params.id);
      const postsFilePath = path.join(__dirname, '..', 'public', 'posts.json');
      const jsonData = await readJsonData(postsFilePath);
      const updatedPostIndex = jsonData.findIndex(post => post.id === postId);

      if (updatedPostIndex === -1) {
        res.status(404).json({ error: 'Post not found' });
        return;
      }

      const updatedPost = { ...jsonData[updatedPostIndex], ...req.body };
      jsonData[updatedPostIndex] = updatedPost;
      await writeJsonData(postsFilePath, jsonData);
      res.json(updatedPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  deletePost: async (req, res) => {
    try {
      const postId = parseInt(req.params.id);
      const postsFilePath = path.join(__dirname, '..', 'public', 'posts.json');
      const jsonData = await readJsonData(postsFilePath);
      const updatedJsonData = jsonData.filter(post => post.id !== postId);
      await writeJsonData(postsFilePath, updatedJsonData);
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};
