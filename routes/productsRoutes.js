// routes/productsRoutes.js
const express = require('express');
const productsController = require('../controllers/productsController');

const router = express.Router();

router.get('/products', productsController.getProducts);
router.get('/products/:id', productsController.getProductById);
router.post('/products', productsController.createProduct);
router.put('/products/:id', productsController.updateProduct);
router.patch('/products/:id', productsController.updateProductPartial);
router.delete('/products/:id', productsController.deleteProduct);

module.exports = router;
