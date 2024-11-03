const ordersRouter = require('express').Router(); 
const { getAllOrders, patchOrderById, postOrder, getOrderById, deleteOrder } = require("../controllers/orders.controllers");

ordersRouter.get('/', getAllOrders);
ordersRouter.post('/', postOrder);

ordersRouter.get('/:order_id', getOrderById)
ordersRouter.patch('/:order_id', patchOrderById);
ordersRouter.delete('/:order_id', deleteOrder)

module.exports = ordersRouter; 