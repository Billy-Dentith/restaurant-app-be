const { selectProducts, selectSingleProduct, removeProductById, addProduct, editProduct } = require('../models/products.models');

exports.getAllProducts = (req, res, next) => {
    const { category } = req.query;
    
    selectProducts(category).then((products) => {
        res.status(200).send({ products })
    }).catch(next)
}

exports.getProductById = (req, res, next) => {    
    const { id } = req.params;    

    selectSingleProduct(id).then((product) => {
        res.status(200).send({ product })
    }).catch(next)
}

exports.deleteProductById = (req, res, next) => {
    const { id } = req.params;

    removeProductById(id).then(() => {
        res.status(204).send();
    }).catch(next)
}

exports.postProduct = (req, res, next) => {
    const newProduct = req.body;
    const acceptedProperties = ['title', 'description', 'image', 'price', 'options', 'catSlug']
    let validProduct = true;

    Object.keys(newProduct).forEach((key) => {
        if (!acceptedProperties.includes(key)) {
            validProduct = false; 
        }
    })

    if (validProduct) {
        addProduct(newProduct).then((product) => {
            res.status(201).send({ product })
        }).catch(next)
    } else {
        res.status(400).send({ message: "Invalid Product"})
    }
}

exports.patchProductById = (req, res, next) => {
    const { id } = req.params;
    const updates = req.body;
    
    const acceptedProperties = ['title', 'description', 'image', 'price', 'is_featured', 'options']

    if (!updates || Object.keys(updates).length === 0) {
        return res.status(400).send({ message: "Request body cannot be empty" });
    }

    const isValid = Object.keys(updates).every((key) => acceptedProperties.includes(key));

    if (!isValid) {
        return res.status(400).send({ message: "Invalid product" });
    }
   
    editProduct(id, updates)
        .then((product) => {        
            return res.status(200).send({ product })
        })
        .catch((err) => {
            console.error("Error in editProduct:", err); 
            next(err); 
        });
}