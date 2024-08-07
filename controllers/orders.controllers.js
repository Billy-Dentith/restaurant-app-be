const { selectOrders } = require("../models/orders.models")

exports.getAllOrders = (req, res, next) => {
    selectOrders().then((orders) => {
        res.status(200).send({ orders });
    })
}