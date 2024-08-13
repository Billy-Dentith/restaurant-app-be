const { selectProducts } = require('../models/products.models');

exports.getAllProducts = (req, res, next) => {
    const { category } = req.query;
    
    selectProducts(category).then((products) => {
        res.status(200).send({ products })
    })
}

// exports.getProductsByCategory = (req, res, next) => {
//     // const cat_slug = req.query;

//     selectProductsByCategory(cat_slug).then((products) => {
//         res.status(200).send({ products })
//     })
// }