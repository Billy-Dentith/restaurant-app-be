const productsRouter = require('express').Router();
const { getAllProducts, getProductById } = require('../controllers/products.controller')

productsRouter.get('/', getAllProducts);

productsRouter.get('/:id', getProductById)

module.exports = productsRouter; 