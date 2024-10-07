const productsRouter = require('express').Router();
const { getAllProducts, getProductById, deleteProductById } = require('../controllers/products.controller')

productsRouter.get('/', getAllProducts);

productsRouter.get('/:id', getProductById);
productsRouter.delete('/:id', deleteProductById);

module.exports = productsRouter; 