const { selectOrders } = require("../models/orders.models")

exports.getAllOrders = (req, res, next) => {
    const { userEmail } = req.query; 

    selectOrders(userEmail).then((orders) => {
        res.status(200).send({ orders });
    })
}