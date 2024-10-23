const { selectOrders, updateOrderById, insertOrder, selectOrderById, getOrderByPaymentIntent } = require("../models/orders.models")

exports.getAllOrders = (req, res, next) => {
    const { userEmail } = req.query; 

    selectOrders(userEmail).then((orders) => {
        res.status(200).send({ orders });
    }).catch(next)
}

exports.patchOrderById = (req, res, next) => {
    const { order_id } = req.params;
    const updOrder = req.body;    
    const acceptedUpdates = ['status', 'stripe_id'];
    let validOrder = true; 

    Object.keys(updOrder).forEach((key) => {
        if (!acceptedUpdates.includes(key)) {
            validOrder = false;
        }
    })

    if (validOrder) {
        updateOrderById(order_id, updOrder).then((order) => {
            res.status(202).send({ order }); 
        }).catch(next)
    } else {
        res.status(400).send({ message: "Bad Request"})
    }

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
        }).catch(next)
    } else {
        res.status(400).send({ message: "Invalid Order"})
    }
}

exports.getOrderById = (req, res, next) => {
    const { order_id } = req.params;

    selectOrderById(order_id).then((order) => {
        res.status(200).send({ order })
    }).catch(next)
}

exports.updateOrder = (req, res, next) => {
    const { intentId } = req.params;
    const updStatus = req.body; 
    
    getOrderByPaymentIntent(intentId)
        .then((order) => {
            if (!order) {
                return res.status(404).send({ message: "Order not found!"});
            }

            return updateOrderById(order.id, updStatus);
        })
        .then((updatedOrder) => {
            return res.status(202).send({ updatedOrder })
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).send({ message: "An error occurred while updating the order"})
        })
}