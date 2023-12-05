// controllers/productsController.js
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
  getProducts: async (req, res) => {
    try {
      const productsFilePath = path.join(__dirname, '..', 'public', 'products.json');
      const jsonData = await readJsonData(productsFilePath);
      res.json(jsonData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getProductById: async (req, res) => {
    try {
      const productId = parseInt(req.params.id);
      const productsFilePath = path.join(__dirname, '..', 'public', 'products.json');
      const jsonData = await readJsonData(productsFilePath);
      const product = jsonData.find(product => product.id === productId);

      if (!product) {
        res.status(404).json({ error: 'product not found' });
        return;
      }

      res.json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  createProduct: async (req, res) => {
    try {
      const productsFilePath = path.join(__dirname, '..', 'public', 'products.json');
      const jsonData = await readJsonData(productsFilePath);
      const newproduct = req.body;
      newproduct.id = jsonData.length + 1;
      jsonData.push(newproduct);
      await writeJsonData(productsFilePath, jsonData);
      res.json(newproduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const productId = parseInt(req.params.id);
      const productsFilePath = path.join(__dirname, '..', 'public', 'products.json');
      const jsonData = await readJsonData(productsFilePath);
      const updatedproductIndex = jsonData.findIndex(product => product.id === productId);

      if (updatedproductIndex === -1) {
        res.status(404).json({ error: 'product not found' });
        return;
      }

      const updatedproduct = { ...jsonData[updatedproductIndex], ...req.body };
      jsonData[updatedproductIndex] = updatedproduct;
      await writeJsonData(productsFilePath, jsonData);
      res.json(updatedproduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  updateProductPartial: async (req, res) => {
    try {
      const productId = parseInt(req.params.id);
      const productsFilePath = path.join(__dirname, '..', 'public', 'products.json');
      const jsonData = await readJsonData(productsFilePath);
      const updatedproductIndex = jsonData.findIndex(product => product.id === productId);

      if (updatedproductIndex === -1) {
        res.status(404).json({ error: 'product not found' });
        return;
      }

      const updatedproduct = { ...jsonData[updatedproductIndex], ...req.body };
      jsonData[updatedproductIndex] = updatedproduct;
      await writeJsonData(productsFilePath, jsonData);
      res.json(updatedproduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const productId = parseInt(req.params.id);
      const productsFilePath = path.join(__dirname, '..', 'public', 'products.json');
      const jsonData = await readJsonData(productsFilePath);
      const updatedJsonData = jsonData.filter(product => product.id !== productId);
      await writeJsonData(productsFilePath, updatedJsonData);
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};
