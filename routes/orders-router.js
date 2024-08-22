const ordersRouter = require('express').Router(); 
const { getAllOrders, patchOrderById } = require("../controllers/orders.controllers");

ordersRouter.get('/', getAllOrders);
ordersRouter.patch('/:order_id', patchOrderById);

module.exports = ordersRouter; 