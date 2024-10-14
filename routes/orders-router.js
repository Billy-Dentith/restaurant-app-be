const ordersRouter = require('express').Router(); 
const { getAllOrders, patchOrderById, postOrder } = require("../controllers/orders.controllers");

ordersRouter.get('/', getAllOrders);
ordersRouter.patch('/:order_id', patchOrderById);
ordersRouter.post('/', postOrder);

module.exports = ordersRouter; 