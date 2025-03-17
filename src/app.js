const express = require('express');
const apiRouter = require('./routes/api-router')
const { handleInvalidEndpoint, handleCustomErrors, handleServerErrors, handlePsqlErrors } = require('./errors');
const categoriesRouter = require('./routes/categories-router');
const productsRouter = require('./routes/products-router');
const ordersRouter = require('./routes/orders-router');

const app = express();

app.use(express.json())

app.use('/api', apiRouter);

apiRouter.use('/categories', categoriesRouter);
apiRouter.use('/products', productsRouter); 
apiRouter.use('/orders', ordersRouter);

app.all('*', handleInvalidEndpoint); 

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

module.exports = app;