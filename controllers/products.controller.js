const { selectProducts, selectSingleProduct } = require('../models/products.models');

exports.getAllProducts = (req, res, next) => {
    const { category } = req.query;
    
    selectProducts(category).then((products) => {
        res.status(200).send({ products })
    })
}

exports.getProductById = (req, res, next) => {    
    const { id } = req.params;    

    selectSingleProduct(id).then((product) => {
        res.status(200).send({ product })
    })
}
