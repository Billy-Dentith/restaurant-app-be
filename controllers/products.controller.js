const { selectProducts } = require('../models/products.models');

exports.getAllProducts = (req, res, next) => {
    selectProducts().then((products) => {
        res.status(200).send({ products })
    })
}