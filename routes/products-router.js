const productsRouter = require('express').Router();
const { getAllProducts } = require('../controllers/products.controller')

productsRouter.get('/', getAllProducts);
// productsRouter.get('/:category', getProductsByCategory);

module.exports = productsRouter; 