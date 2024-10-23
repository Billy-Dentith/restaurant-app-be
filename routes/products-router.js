const productsRouter = require('express').Router();
const { getAllProducts, getProductById, deleteProductById, postProduct } = require('../controllers/products.controller')

productsRouter.get('/', getAllProducts);
productsRouter.post('/', postProduct); 

productsRouter.get('/:id', getProductById);
productsRouter.delete('/:id', deleteProductById);

module.exports = productsRouter; 