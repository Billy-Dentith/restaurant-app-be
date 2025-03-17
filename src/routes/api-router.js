const { getHealthCheck, getEndpoints } = require('../controllers/app.controllers');
const { updateOrder } = require('../controllers/orders.controllers');
const apiRouter = require('express').Router();

apiRouter.get('/', getEndpoints);
apiRouter.get('/healthcheck', getHealthCheck)

apiRouter.patch('/confirm/:intentId', updateOrder)

module.exports = apiRouter; 