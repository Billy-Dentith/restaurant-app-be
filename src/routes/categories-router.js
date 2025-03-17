const categoriesRouter = require('express').Router();
const { getAllCategories } = require('../controllers/categories.controllers')

categoriesRouter.get('/', getAllCategories);

module.exports = categoriesRouter; 