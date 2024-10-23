const { selectProducts, selectSingleProduct, removeProductById, addProduct } = require('../models/products.models');

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

exports.postProduct = (req, res, next) => {
    const newProduct = req.body;
    
    addProduct(newProduct).then((product) => {
        res.status(201).send({ product })
    })
}
