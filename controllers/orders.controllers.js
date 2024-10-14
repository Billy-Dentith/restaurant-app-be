const { selectOrders, updateOrderById, insertOrder, selectOrderById } = require("../models/orders.models")

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

exports.postOrder = (req, res, next) => {
    const newOrder = req.body;    
    const acceptedProperties = ['price', 'status', 'products', 'userEmail']
    let validOrder = true;

    Object.keys(newOrder).forEach((key) => {
        if (!acceptedProperties.includes(key)) {
            validOrder = false;
        }
    })
    
    if (validOrder) {
        insertOrder(newOrder).then((order) => {
            res.status(201).send({ order });
        })
    }
}

exports.getOrderById = (req, res, next) => {
    const { order_id } = req.params;

    selectOrderById(order_id).then((order) => {
        res.status(200).send({ order })
    })
}