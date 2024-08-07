const ordersRouter = require('express').Router(); 
const { getAllOrders } = require("../controllers/orders.controllers");

ordersRouter.get('/', getAllOrders);

module.exports = ordersRouter; 