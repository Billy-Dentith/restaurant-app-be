const { selectOrders, updateOrderById } = require("../models/orders.models")

exports.getAllOrders = (req, res, next) => {
    const { userEmail } = req.query; 

    selectOrders(userEmail).then((orders) => {
        res.status(200).send({ orders });
    })
}

exports.patchOrderById = (req, res, next) => {
    const { order_id } = req.params;
    const updOrder = req.body;    

    updateOrderById(order_id, updOrder).then((order) => {
        res.status(202).send({ order }); 
    })
}