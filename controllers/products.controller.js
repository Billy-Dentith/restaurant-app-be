const { selectProducts } = require('../models/products.models');

exports.getAllProducts = (req, res, next) => {
    const { category } = req.query;
    
    selectProducts(category).then((products) => {
        res.status(200).send({ products })
    })
}
