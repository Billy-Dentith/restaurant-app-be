const { getHealthCheck, getEndpoints } = require('../controllers/app.controllers');
const apiRouter = require('express').Router();

apiRouter.get('/', getEndpoints);
apiRouter.get('/healthcheck', getHealthCheck)

module.exports = apiRouter; 