const { selectCategories } = require('../models/categories.models')

exports.getAllCategories = (req, res, next) => {
    selectCategories().then((categories) => {
        res.status(200).send({ categories });
    })
}