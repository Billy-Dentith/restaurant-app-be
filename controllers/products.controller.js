const { selectProducts, selectSingleProduct, removeProductById } = require('../models/products.models');

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

exports.deleteProductById = (req, res, next) => {
    const { id } = req.params;

    removeProductById(id).then(() => {
        res.status(204).send();
    })
}
